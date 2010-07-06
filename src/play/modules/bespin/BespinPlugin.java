package play.modules.bespin;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;

import play.Play;
import play.Play.Mode;
import play.PlayPlugin;
import play.libs.IO;
import play.mvc.Http.Request;
import play.mvc.Http.Response;

import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class BespinPlugin extends PlayPlugin {

    @Override
    public boolean rawInvocation(Request request, Response response) {
        try {
            if (Play.mode == Mode.PROD) {
                return false;
            }
            // -- /bespin
            if (request.path.equals("/bespin") || request.path.equals("/bespin/")) {
                response.status = 302;
                response.setHeader("Location", "/bespin/public/index.html");
                return true;
            }
            // -- /bespin/serverconfig.js
            if (request.path.equals("/bespin/serverconfig.js")) {
                return serveConfig(request, response);
            }
            // -- Static files (/bespin/public)
            if (request.path.startsWith("/bespin/public/")) {
                String path = request.path.substring("/bespin/public".length());
                return servePublic(request, response, path);
            }
            // -- /bespin/file/at
            if (request.path.startsWith("/bespin/file/at/")) {
                File file = Play.getFile(request.path.substring("/bespin/file/at".length()));
                return serveStatic(request, response, file);
            }
            // -- /bespin/save/
            if (request.path.startsWith("/bespin/save/")) {
                File file = Play.getFile(request.path.substring("/bespin/save".length()));
                InputStream content = request.body;
                save(content, file);
                return true;
            }
            // -- bespin/list
            if (request.path.startsWith("/bespin/list/")) {
                String root = request.path.substring("/bespin/list".length());
                List<File> fileList = Arrays.asList(Play.getFile(root).listFiles());
                response.status = 200;
                response.out.write(serialize(fileList).getBytes("utf-8"));
                return true;
            }
            return false;
        } catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void save(InputStream is, File target) {
        FileOutputStream os;
        try {
            os = new FileOutputStream(target);
        } catch (FileNotFoundException e) {
            // TODO create the file
            e.printStackTrace();
            return;
        }

        int c;
        try {
            while ((c = is.read()) != -1) {
                os.write(c);
            }
            is.close();
            os.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return;
        }
    }

    private boolean servePublic(Request request, Response response, String path) throws Exception {
        String fullPath = getBespinFolder().getPath() + File.separator + "public" + path;
        boolean binary = false;
        if (path.endsWith(".html") || path.endsWith(".htm")) {
            response.contentType = "text/html; charset=utf8";
        } else if (path.endsWith(".css")) {
            response.contentType = "text/css; charset=utf8";
        } else if (path.endsWith(".png")) {
            response.contentType = "image/png";
            binary = true;
        }
        if (binary)
            return serveBinary(request, response, new File(fullPath));
        else
            return serveStatic(request, response, new File(fullPath));
    }

    private boolean serveBinary(Request request, Response response, File file) throws Exception {
        FileInputStream is = new FileInputStream(file);
        byte[] buffer = new byte[8092];
        int count = 0;
        while ((count = is.read(buffer)) > 0) {
            response.out.write(buffer, 0, count);
        }
        is.close();
        return true;
    }

    private boolean serveStatic(Request request, Response response, File file) throws Exception {
        try {
            if(request.method.equals("GET")) {
                response.status = 200;
                response.out.write(IO.readContentAsString(file).replace("\t", "    ").getBytes("utf-8"));
            } else {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                int r = -1;
                while((r = request.body.read()) != -1) {
                    baos.write(r);
                }
                IO.writeContent(new String(baos.toByteArray(), "utf-8"), file);
            }
            return true;
        } catch (FileNotFoundException e) {
            response.status = 404;
            return false;
        }
    }

    private boolean serveConfig(Request request, Response response) throws Exception {
        response.status = 200;
        String body = "var serverConfig = { 'rootUrl': '"
            + Play.applicationPath
            + "' }";
        response.out.write(body.replace("\t", "    ").getBytes("utf-8"));
        return true;
    }

    @Override
    public void onConfigurationRead() {
        if (!Play.configuration.contains("play.editor")) {
            Play.configuration.put("play.editor", "/bespin/public/index.html#%s|%s");
        }
    }

    private File getBespinFolder() {
        return Play.modules.get("bespin").getRealFile();
    }

    public static final Type listFileType = new TypeToken<List<File>>(){}.getType();

    private static String serialize(List<File> list) {
        GsonBuilder gson = new GsonBuilder();
        gson.registerTypeAdapter(File.class, new FileSerializer());
        gson.registerTypeAdapter(listFileType, new FileListSerializer());
        String result = gson.create().toJson(list, listFileType);
        return result;
    }

}

package play.modules.bespin;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.List;
import play.Play;
import play.PlayPlugin;
import play.libs.IO;
import play.mvc.Http.Request;
import play.mvc.Http.Response;

public class BespinPlugin extends PlayPlugin {

	@Override
	public boolean rawInvocation(Request request, Response response) {
		try {
			// -- /bespin
			if(request.path.equals("/bespin")) {
				response.status = 302;
				response.out.write("/bespin/public/index.html".getBytes("utf-8"));
			}
			// -- Static files (/bespin/public)
			if(request.path.startsWith("/bespin/public/")) {
				String path = request.path.substring("/bespin/public".length());
				return servePublic(request, response, path);
			}
			// -- /bespin/file/list
			if(request.path.startsWith("/bespin/file/list/")) {
				String root = request.path.substring("/bespin/file/list".length());
				List<File> fileList = Arrays.asList(Play.getFile(root).listFiles());
				response.status = 200;
				response.out.write(list(fileList).getBytes("utf-8"));
				return true;
			}
			// -- /bespin/register/listopen
			if(request.path.equals("/bespin/file/listopen/")) {
				response.status = 200;
				response.out.write("{}".getBytes("utf-8"));
				return true;
			}
			// -- /bespin/register/listopen
			if(request.path.startsWith("/bespin/file/at/")) {
				File file = Play.getFile(request.path.substring("/bespin/file/at".length()));
				return serveStatic(request, response, file);
			}
			return false;
		} catch(Exception e) {
			throw new RuntimeException(e);
		}
	}

	private boolean servePublic(Request request, Response response, String path) throws Exception {
		String fullPath = getBespinFolder().getPath() + File.separator + "public" + path;
		if (path.endsWith(".html") || path.endsWith(".htm")) {
			response.contentType = "text/html; charset=utf8";
		} else if (path.endsWith(".css")) {
			response.contentType = "text/css; charset=utf8";
		}
		return serveStatic(request, response, new File(fullPath));
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

	private File getBespinFolder() {
		return Play.modules.get("bespin").getRealFile();
	}

	static String list(List<File> list) {
		StringBuffer buf = new StringBuffer("[");
		for(File file : list) {
			if(file.isDirectory()) {
				buf.append("{\"name\": \"" + file.getName()+"/\"},");
			} else {
				buf.append("{\"name\": \"" + file.getName()+"\", \"size\": " + file.length() + "},");
			}
		}
		buf.append("]");
		return buf.toString();
	}

}

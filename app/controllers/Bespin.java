package controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.File;
import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import play.*;
import play.mvc.*;
import play.libs.IO;

public abstract class Bespin extends Controller {
    private static Gson gson = null;

    @Before
    @SuppressWarnings("unused")
    private static void prepareGson() {
        if (gson == null) {
            GsonBuilder gsonbuilder = new GsonBuilder();
            gsonbuilder.registerTypeAdapter(File.class, new FileSerializer());
            gson = gsonbuilder.create();
        }
    }

    public static void index() {
        render();
    }

    public static void edit(String path) {
        String content = "";
        try {
            content = IO.readContentAsString(Play.getFile(path)).replace("\t", "    ");
        } catch (IOException e) {}
        String jsonTree = gson.toJson(Play.getFile("/"));
        render(path, content, jsonTree);
    }

    public static void save(String path, String content) {
        try {
            IO.writeContent(content, Play.getFile(path));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
}

    private static class FileSerializer implements JsonSerializer<File> {
        public JsonElement serialize(File f, Type typeOfSrc, JsonSerializationContext context) {
            JsonObject result = new JsonObject();
            String name = f.getName();

            JsonObject data = new JsonObject();
            JsonObject attributes = new JsonObject();
            if (name.equals("")) {
                name = "root";
                attributes.addProperty("rel", "root");
                result.addProperty("state", "open");
            } else if (f.isDirectory()) {
                attributes.addProperty("rel", "folder");
            } else {
                attributes.addProperty("rel", "file");
                JsonObject dataAttributes = new JsonObject();
                dataAttributes.addProperty("href", "/bespin/edit/" + f.getAbsolutePath().split("//")[1]);
                data.add("attributes", dataAttributes);
            }
            data.addProperty("title", name);
            result.add("data", data);
            result.add("attributes", attributes);
            File[] children = f.listFiles();
            if (children != null) {
                JsonArray jsChildren = new JsonArray();
                for (File c: children) {
                    if (!c.getName().matches("^(tmp|lib|.svn|.bzr)$")) {
                        jsChildren.add(context.serialize(c));
                    }
                }
                if (jsChildren.size() > 0) {
                    result.add("children", jsChildren);
                }
            }
            return result;
        }
    }
}


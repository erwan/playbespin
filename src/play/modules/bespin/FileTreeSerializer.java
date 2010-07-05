package play.modules.bespin;

import java.io.File;
import java.lang.reflect.Type;

import play.Logger;
import play.Play;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class FileTreeSerializer implements JsonSerializer<File> {

    @Override
    public JsonElement serialize(File file, Type type, JsonSerializationContext context) {
        Logger.info("Serialize " + file.getName());
        JsonObject result = new JsonObject();
        result.add("data", new JsonPrimitive(file.getName()));
        if (file.isDirectory()) {
            Logger.info("Yes, " + file.getName() + " is a dir");
            JsonArray children = new JsonArray();
            for (File child: file.listFiles()) {
                children.add(serialize(child, File.class, context));
            }
            result.add("children", children);
        }
        JsonObject attributes = new JsonObject();
        attributes.add("rel", new JsonPrimitive(file.isDirectory() ? "folder" : "file"));
        attributes.add("href", new JsonPrimitive(getRelativePath(file)));
        result.add("attributes", attributes);

        return result;
    }

    private static String getRelativePath(File file) {
        if (file == null || file.equals(Play.getFile(""))) {
            return "";
        }
        return getRelativePath(file.getParentFile()) + "/" + file.getName();
    }

}

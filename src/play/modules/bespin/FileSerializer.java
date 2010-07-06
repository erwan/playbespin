package play.modules.bespin;

import java.io.File;
import java.lang.reflect.Type;
import java.util.Arrays;

import play.Play;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class FileSerializer implements JsonSerializer<File> {

    @Override
    public JsonElement serialize(File file, Type type, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        // Attributes
        JsonObject attributes = new JsonObject();
        attributes.add("rel", new JsonPrimitive(file.isDirectory() ? "folder" : "file"));
        attributes.add("href", new JsonPrimitive("#" + getRelativePath(file)));

        // Data
        JsonObject data = new JsonObject();
        data.add("title", new JsonPrimitive(file.getName()));
        data.add("attr", attributes);
        if (!file.isDirectory()) {
            data.add("icon", new JsonPrimitive("/bespin/public/images/file.png"));
        }
        result.add("data", data);

        // Children (if directory)
        if (file.isDirectory()) {
            result.add("children", context.serialize(Arrays.asList(file.listFiles()), BespinPlugin.listFileType));
        }

        return result;
    }

    private static String getRelativePath(File file) {
        if (file == null || file.equals(Play.getFile("")) || file.getName().length() == 0) {
            return "";
        }
        return getRelativePath(file.getParentFile()) + "/" + file.getName();
    }

}

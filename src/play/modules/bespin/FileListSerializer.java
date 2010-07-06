package play.modules.bespin;

import java.io.File;
import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class FileListSerializer implements JsonSerializer<List<File>> {

    @Override
    public JsonElement serialize(List<File> list, Type type, JsonSerializationContext context) {
        JsonArray result = new JsonArray();
        for (File file: list) {
            if (reject(file)) {
                continue;
            }
            result.add(context.serialize(file));
        }
        return result;
    }

    public static boolean reject(File file) {
        String name = file.getName();
        if (name.equals(".svn")) return true;
        if (name.equals(".bzr")) return true;
        if (name.equals(".git")) return true;
        if (name.equals("tmp")) return true;
        if (name.endsWith("~")) return true;
        return false;
    }

}

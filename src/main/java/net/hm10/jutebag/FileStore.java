package net.hm10.jutebag;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.hm10.dto.Jutebag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.io.File;
import java.io.IOException;

@Singleton
public class FileStore implements JutebagStore {

    private static final Logger LOG = LoggerFactory.getLogger(JutebagStore.class);

    private final File FILE;

    @Inject
    FileStore() {
        this("jutebagContent.xml");
    }

    FileStore(String fName) {
        FILE = new File("./data/" + fName);
    }


    public void store(Jutebag bag) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            LOG.info("Trying to write to {}", FILE.getAbsolutePath());
            LOG.info("Storing data with {} items to file {}.", bag.getItems().size(), FILE);
            mapper.writeValue(FILE, bag);
        } catch (IOException e) {
            LOG.error("Failed to write data to {}", FILE, e);
        }
    }

    public Jutebag load() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(FILE, Jutebag.class);
        } catch (IOException e) {
            return Jutebag.create(); // empty on IO error. Fixme: proper error handling
        }
    }

}

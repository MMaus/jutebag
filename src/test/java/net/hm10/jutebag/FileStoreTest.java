package net.hm10.jutebag;

import net.hm10.dto.Jutebag;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FileStoreTest {

    FileStore fileStore;

    @BeforeEach
    public void setUp() {
        fileStore = new FileStore("testData.xml");

    }

    @Test
    public void can_store_and_restore_data() {
        Jutebag original = Jutebag.create("Beer", "Pizza");
        fileStore.store(original);
        Jutebag restored = fileStore.load();
        assertEquals(original.getItems(), restored.getItems());
    }

}

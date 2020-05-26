package net.hm10;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.reactivex.Flowable;
import net.hm10.dto.BagItem;
import net.hm10.dto.Jutebag;
import net.hm10.jutebag.JutebagStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Controller("/jutebag")
public class JutebagController {

    private static final Logger LOG = LoggerFactory.getLogger(JutebagController.class);
    private final JutebagStore store;

    private Jutebag myBag = Jutebag.create();

    @Inject
    JutebagController(JutebagStore store) {
        this.store = store;
    }

    @Get
    @Produces(MediaType.TEXT_PLAIN)
    public String index() {
        return "Hello, World!";
    }

    @Get("/bag")
    @Produces(MediaType.APPLICATION_JSON)
    public Jutebag bag() {
        LOG.info("received GET request, returning {}", myBag);
        LOG.info("loading data: {}", store.load());
        return myBag;
    }

    // Fixme: Make proper return type - create reasonable API
    @Post(value = "/add", consumes = MediaType.APPLICATION_JSON)
    public HttpResponse<BagItem> add(@Body Flowable<BagItem> addedItems) {
        List<BagItem> receivedData = new ArrayList<>();

        LOG.info("received 'add' request");
        try {
            addedItems.blockingIterable().forEach(receivedData::add);
            myBag = new Jutebag(receivedData);
        } catch (RuntimeException e) {
            LOG.error("Oops", e);
        }
        store.store(myBag);
        LOG.info("storing data");
        return HttpResponse.ok(new BagItem("nothing", 0));
    }


}

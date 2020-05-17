package net.hm10;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.reactivex.Flowable;
import net.hm10.dto.BagItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller("/jutebag")
public class JutebagController {

    private static final Logger LOG = LoggerFactory.getLogger(JutebagController.class);

    @Get
    @Produces(MediaType.TEXT_PLAIN)
    public String index() {
        return "Hello, World!";
    }

    @Get("/bag")
    @Produces(MediaType.APPLICATION_JSON)
    public BagItem bag() {
        BagItem stub = new BagItem("butter", 2);
        LOG.info("received GET request, returning {}", stub);
        return stub;
    }

    @Post(value = "/add", consumes = MediaType.APPLICATION_JSON)
    public HttpResponse<BagItem> add(@Body Flowable<BagItem> addedItems) {

        LOG.info("received 'add' request");
        try {
            addedItems.blockingIterable().forEach(item -> LOG.info("going to store {}", item));
            // LOG.info("going to store item {}", item));
        } catch (RuntimeException e) {
            LOG.error("Oops", e);
        }
        return HttpResponse.ok(new BagItem("nothing", 0));
    }


}

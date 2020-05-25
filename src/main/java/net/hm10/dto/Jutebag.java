package net.hm10.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.*;
import java.util.stream.Collectors;

/**
 * DTO containing all items of the shopping list
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Jutebag {

    private List<BagItem> items;

    @SuppressWarnings("unused")
    Jutebag() {
        this(Collections.emptyList());
    }

    Jutebag(Collection<BagItem> items) {
        this.items = new ArrayList<>();
        this.items.addAll(items);
    }

    public static Jutebag create(String ... items) {
        return new Jutebag(Arrays.stream(items).map(item -> new BagItem(item, 1)).collect(Collectors.toList()));
    }

    @Override
    public String toString() {
        return "Jutebag{" +
                "items=" + items +
                '}';
    }

}

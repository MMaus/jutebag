package net.hm10.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class BagItem {

    @JsonProperty("item")
    private String name = "";

    private int qty = 1;

    private boolean inCart = false;

    @SuppressWarnings("unused")
    public BagItem() {
        // required for Jackson
    }

    public BagItem(String item, int qty) {
        this.name = item;
        this.qty = qty;
    }

    public String getItem() {
        return name;
    }

    public int getQty() {
        return qty;
    }

    public boolean isInCart() {
        return inCart;
    }

    @Override
    public String toString() {
        return "BagItem{" +
                "item='" + name + '\'' +
                ", qty=" + qty +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BagItem bagItem = (BagItem) o;
        return qty == bagItem.qty &&
                inCart == bagItem.inCart &&
                Objects.equals(name, bagItem.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, qty, inCart);
    }

}

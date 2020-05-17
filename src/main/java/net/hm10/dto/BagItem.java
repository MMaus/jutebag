package net.hm10.dto;

public class BagItem {


    String item;
    int qty;

    @SuppressWarnings("unused")
    public BagItem() {
        // required for Jackson
    }

    public BagItem(String item, int qty) {
        this.item = item;
        this.qty = qty;
    }

    public String getItem() {
        return item;
    }

    public int getQty() {
        return qty;
    }

    @Override
    public String toString() {
        return "BagItem{" +
                "item='" + item + '\'' +
                ", qty=" + qty +
                '}';
    }

}

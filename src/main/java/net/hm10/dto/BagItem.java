package net.hm10.dto;

public class BagItem {


    String item;
    int qty;

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

}

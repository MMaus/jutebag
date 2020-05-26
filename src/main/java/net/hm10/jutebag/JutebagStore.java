package net.hm10.jutebag;

import net.hm10.dto.Jutebag;

public interface JutebagStore {

    void store(Jutebag data);

    Jutebag load();

}

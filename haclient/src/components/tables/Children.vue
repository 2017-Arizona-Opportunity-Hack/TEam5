<template>
    <div>
        <div class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1">Children</span>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div class="container-fluid">

            <div class="list-group">
                <div class="list-group-item" id="headers">
                    <div class="form-row">
                        <div class="col-sm-1">
                            <p>id</p>
                        </div>
                        <div class="col">
                            <p>name</p>
                        </div>
                        <div class="col-sm-5">
                            <p>home</p>
                        </div>
                        <div>
                            <i class="icon-pencil"></i>
                        </div>
                    </div>
                </div>
                <child-item v-for="child in children" :key="child.id" :id="child.id" />
                <div class="list-group-item">
                    <div class="btn btn-success" @click="addNew">New</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Child from "@/store/classes/Child";
import ChildItem from "@/components/items/ChildItem.vue";
export default Vue.extend({
    computed: {
        children() {
            return this.$store.getters.children;
        }
    },
    components: {
        ChildItem
    },
    methods: {
        addNew() {
            console.log(this.$store);
            this.$store.dispatch("createChild", new Child(0, "", 0, false));
        }
    }
});
</script>

<style lang="scss" scoped>
.childrow {
    margin-bottom: 10px;
}
</style>



<template>
    <div id="header" class="header">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">我的项目</template>
                <el-menu-item index="1">全部</el-menu-item>
                <el-menu-item :index="proItem.projectIndex" v-for="proItem in projects">{{ proItem.projectName }}</el-menu-item>
            </el-submenu>
            <el-submenu index="2" :show="showCategories">
                <template slot="title">项目分类</template>
                <el-menu-item index="1">全部</el-menu-item>
                <el-menu-item :index="cateItem.categoryIndex" v-for="cateItem in categories">{{ cateItem.categoryName }}</el-menu-item>
            </el-submenu>
            <el-input placeholder="请输入内容" v-model="searchKey" class="search-input">
                <template slot="prepend">图标名称:</template>
            </el-input>
        </el-menu>
    </div>
</template>

<script>
    import axios from 'axios';
    import Router from '../router';
    var moment = require('moment');
    var baseUrl = require('../../config').global.BASE_URL;
    
    export default {
        data() {
            return {
                activeIndex: '1',
                showCategories: false,
                projects: [],
                categories: [],
                searchKey: ''
            };
        },
        beforeMount() {
            var me = this;
            axios({
                method: 'post',
                url: baseUrl + 'queryProject',
                data: {
                    sig: this.$route.params.sig
                }
            }).then(function (response) {
                me.projects = response.data.list.map(function (value, index, array) {
                    return {
                        projectId: value.projectId,
                        projectName: value.projectName,
                        projectIndex: (index + 2).toString(),
                        categoryList: value.categoryList
                    }
                });
                console.log(me.projects);
//                axios({
//                    method: 'post',
//                    url: baseUrl + 'queryIconBySig',
//                    data: {
//                        sig: me.$route.params.sig
//                    }
//                }).then(function (response) {
//                    var iconList = response.data.list;
//                    console.log(iconList);
//                });
            });
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key > 1 && keyPath[0] == '1') {
                    this.showCategories = true;
                    this.categories = this.projects[key - 2].categoryList.map(function (value, index, array) {
                        return {
                            categoryId: value.categoryId,
                            categoryName: value.categoryName,
                            categoryIndex: (index + 2).toString()
                        };
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .header {
    }

    .el-select .el-input {
        width: 110px;
    }

    .search-input {
        width: 300px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 230px;
    }
</style>
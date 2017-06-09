<template>
    <div class="register">
        <!--<el-row :gutter="10">-->
        <!--<el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple"></div></el-col>-->
        <!--</el-row>-->
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="registerForm.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('registerForm')">登录</el-button>
                <el-button @click="reset('registerForm')">重置</el-button>
                <el-button type="primary" @click="register('registerForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';
    import Router from '../router';
    var moment = require('moment');
    var baseUrl = require('../../config').global.BASE_URL;

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    export default {
        data() {
            var me = this;

            var validatePassword = function (rule, value, callback) {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else {
                    if (me.registerForm.checkPass !== '') {
                        me.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            var validatePass2 = function (rule, value, callback) {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                }
                else if (value !== me.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                }
                else {
                    callback();
                }
            };

            return {
                registerForm: {
                    userName: '',
                    password: '',
                    checkPass: ''
                },
                rules: {
                    userName: [
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            login (formName) {
                var me = this;
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: baseUrl + 'login',

                            data: {
                                username: me.registerForm.userName,
                                password: me.registerForm.password
                            }
                        }).then(function (response) {
                            var result = response.data;
                            if (result.msg == '登录成功') {
                                var sig = result.sig;
                                me.$message({
                                    type: 'info',
                                    message: result.msg
                                });
                                Router.push('iconManage/' + sig);
                            }
                            else {
                                me.$message({
                                    type: 'error',
                                    message: result.msg
                                });
                            }
                        }).catch(function (response) {
                            me.$message({
                                type: 'error',
                                message: response.data.msg
                            });
                        });
                    }
                    else { // 表单验证失败
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            reset (formName) {
                this.$refs[formName].resetFields();
            },
            register (formName) {
                var me = this;
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: baseUrl + 'register',
                            data: {
                                username: me.registerForm.userName,
                                password: me.registerForm.password
                            }
                        }).then(function (response) {
                            var result = response.data;
                            if (result.msg == 'succ') {
                                me.$message({
                                    type: 'info',
                                    message: '注册成功'
                                });
                            }
                            else {
                                me.$message({
                                    type: 'error',
                                    message: result.msg
                                });
                            }
                        }).catch(function (response) {
                            me.$message({
                                type: 'error',
                                message: response.data.msg
                            });
                        });
                    }
                    else {
                        me.$message({
                            type: 'error',
                            message: '填写信息不合要求'
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .register {
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>

<config>
{
    "usingComponents": {
        "image-cli": "../components/image-cli/image-cli"
    },
    "navigationBarTitleText": "裁剪图片",
    "disableScroll": true
}
</config>

<style>
</style>

<template>
    <view>
        <image-cli id="image-cli" limit_move="{{true}}" disable_rotate="{{true}}" width="{{width}}" height="{{height}}" imgSrc="{{src}}" bindload="cropperload" bindimageload="loadimage" bindtapcut="clickcut"></image-cli>
    </view>
</template>

<script>
import logo from '../assets/logo.png';

console.log(logo);

Page({
    data: {
        src:'',
        width:250,//宽度
        height: 250,//高度
    },
    onLoad: function (options) {
    //获取到image-cropper实例
        this.cropper = this.selectComponent("#image-cropper");
        //开始裁剪
        this.setData({
            src: 'https://static.veer.com/veer/static/resources/recommend/2020-11-13/e4f22a91e8cc4fca981b24709821f086.jpg'
        });
        wx.showLoading({
            title: '加载中'
        })
    },
    cropperload(e){
        console.log("cropper初始化完成");
    },
    loadimage(e){
        console.log("图片加载完成",e.detail);
        wx.hideLoading();
        //重置图片角度、缩放、位置
        this.cropper.imgReset();
    },
    clickcut(e) {
        console.log(e.detail);
        //点击裁剪框阅览图片
        wx.previewImage({
            current: e.detail.url, // 当前显示图片的http链接
            urls: [e.detail.url] // 需要预览的图片http链接列表
        })
    },
    })
</script>

<config>
{
    "usingComponents": {
        "my-image": "../components/test-image.vue",
        "image-cli": "../components/image-cli/image-cli"
    },
    // "disableScroll": true
}
</config>

<style lang='postcss'>
.image-cli {
    overflow: hidden;
}
</style>

<template lang=''>
    <view>
        <my-image
            imageUrl="{{imageUrl}}"
            imageHeight="{{imageHeight}}"
            imageWidth="{{imageWidth}}"
            imageRate="{{imageRate}}"
        ></my-image>
    </view>
</template>

<script>
import test from '../assets/testRotate.png'
Page({
    data: {
       imageUrl: test,
       imageHeight: 0,
       imageWidth: 0,
       imageRate: 0
    },
    onLoad() {
        // let _this = this
        // wx.getImageInfo({
        //     src: test,
        //     success: function(res) {
        //         console.log(res, 111)
        //         const { path, height, width } = res
        //         _this.setData({
        //             // imageUrl: test,
        //             imageHeight: height,
        //             imageWidth: width,
        //             imageRate: height / width
        //         })
        //     }
        // })
    }
})
</script>
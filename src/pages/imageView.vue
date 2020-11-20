<config>
{

}
</config>

<style lang="postcss">
.image {
    height: 100px;
    width: 200px;
}
</style>

<template>
    <view>
        <image class="image" alt='' style="height: {{height}}px; width: {{width}}px" src="{{imageUrl}}"></image>
    </view>
</template>

<script>
Page({
    data: {
        imageUrl: '',
        height: 0,
        width: 0
    },
    onLoad(options) {
        console.log(options)
        const { url } = options
        let _this = this
        wx.getImageInfo({
            src: url,
            success: function(res) {
                console.log(res)
                _this.setData({
                    width: res.width,
                    height: res.height
                })
            }
        })
        this.setData({
            imageUrl: url
        })
    },
})
</script>
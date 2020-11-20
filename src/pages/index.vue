<config>
</config>

<style lang="postcss"> 
    .main {
        position: fixed;
        left: 0;
        top: 0;
        overflow: auto;
        right: 0;
        bottom: 0;
        
        #myCanvas {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
        }

        &-lay {
            height: 100%;
            width: 100%;
            color: red;
            background-color: black;
            opacity: .45;
            position: relative;

            &-test {
                position: absolute;
                height: 100px;
                width: 100%;
                border: 1px solid red;
                background: white;
                /* opacity: 0; */
                top: 50%;
                box-sizing: border-box;
                transform: translateY(-50%);
            }
        }
    }
</style>

<template lang=''>
    <view class="main">
        <canvas type="2d" id="myCanvas">
            <cover-view class="main-lay">
                <cover-view class="main-lay-test" id="select-area">
                    hello world
                </cover-view>
                <button bindtap="onClick">点击选取区域</button>
            </cover-view>
        </canvas>
    <image wx:if="{{image}}" src="{{image}}"></image>
    </view>
</template>

<script>
Page({
    data: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0,
        // image: '../assets/logo.97017d.png',
        image: '',
        canvas: '',
        imageUrl: '',
        imageSrc: '',
        url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605259403227&di=0933ad970ed89c7b2ba2a9ed9b59a612&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0df3d7ca7bcb0a460e01fd9a6f63f6246b60af76.jpg"
    },
    onLoad() {
        // wx.downLoadFile({
        //     url: this.data.url,
        //     success() {

        //     }
        // })
        const query = wx.createSelectorQuery()
        query.select('#myCanvas').fields({ node: true, size: true },
        (res) => {
            console.log(res)
            const { width, height, node } = res
            const canvas = node
            this.data.canvas = node
            canvas.width = width;//本地图像的width
            canvas.height = height;//本地图像的height
            const ctx = canvas.getContext('2d')
            
            setTimeout(() => {
                this.render(canvas, ctx, width, height)
            }, 200);
            const img = canvas.createImage()
            img.onload = () => {
                this._img = img
            }
            img.src = 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg'
            // img.src = 'https://static.veer.com/veer/static/resources/recommend/2020-11-13/e4f22a91e8cc4fca981b24709821f086.jpg'
        })
        query.exec()
    },
    render(canvas, ctx, width, height) {
        if (!this._img) return
        ctx.drawImage(this._img, 0, 0, width, height)
    },
    onClick(e) {
        let _this = this
        const query = wx.createSelectorQuery()
        query.select('#select-area').boundingClientRect()
        query.exec(res => {
            const { left, right, top, bottom, width, height } = res[0]
            console.log(res)
            this.setData({
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                width: width,
                height: height
            }, () => {
                wx.canvasToTempFilePath({
                    canvas: this.data.canvas,
                    x: this.data.left,
                    y: this.data.top,
                    width: this.data.width,
                    height: this.data.height,
                    destWidth: 100,
                    destHeight: 100,
                    canvasId: 'myCanvas',
                    success(res) {
                        console.log(res)
                        _this.setData({
                            image: res.tempFilePath,
                            imageUrl: res
                        })
                        wx.navigateTo({
                        url: `/pages/imageView?url=${res.tempFilePath}`
                    })
                    }
                }, _this)
            })
        })
    }
})
</script>
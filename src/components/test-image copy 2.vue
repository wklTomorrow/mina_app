<config>
{
    "component": true,
    "usingComponents": {
        "over-lay": "../components/over-lay.vue"
    },
}
</config>

<style lang='postcss'>
.main {
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0; */
    height: 100vh;
    width: 100vw;
    background-color: black;
    /* display: flex;
    flex-direction: column; */
    /* overflow: auto; */

    &-image {
        /* flex: 1;     */
        height: calc(100% - 108pt);
        box-sizing: border-box;  
        position: relative;  

        image {
            /* height: 100%;
            width: 100%; */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    &-footer {
        height: 108pt;
        width: 100%;
        position: relative;

        &-sure {
            height: 64pt;
            width: 64pt;
            display: block;
            margin: 22pt auto;
        }

        &-remake {
            position: absolute;
            top: 50%;
            right: 48pt;
            color: #ffffff;
            height: 40pt;
            width: 40pt;
            text-align: center;
            font-size: 12pt;
            line-height: 40pt;
            border-radius: 50%;
            background-color: #616161;
            transform: translateY(-50%);
        }
    }
}
#myCanvas {
    position: fixed;
    /* top: -5000px;
    right: -5000px; */
}
</style>

<template lang=''>
    <view class="main">
        <view class="main-image" id="content-image">
            <image id="cur-image" src="{{imageUrl}}"></image>
            <!-- <image id="cur-image" style="height: {{imageHeight}}px; width: {{imageWidth}}px" src="{{imageUrl}}"></image> -->
        </view>
        <view class="main-footer">
        </view>
    </view>
    <over-lay
        id="over-lay"
        style="z-index: 9999"
        imageStartX="{{imageLeft}}"
        imageStartY="{{imageTop}}"
        imageWidth="{{imageWidth}}"
        imageHeight="{{imageHeight}}"
        height="{{imageHeight - 40}}"
        width="{{imageWidth}}"
        middleLeft="{{imageLeft}}"
        topHeight="{{imageTop + 20}}"
        bind:onClipImage="onClipImage"
    ></over-lay>
    <canvas type="2d" id="myCanvas" style="height: {{canvasHeight}}px;width: {{canvasWidth}}px; top: {{canvasTop}}px; left: {{canvasLeft}}px">
    </canvas>
</template>

<script>
Component({
    properties: {
        imageUrl: {
            type: String,
            // value: ''
            // value: 'https://static.veer.com/veer/static/resources/recommend/2020-11-13/e4f22a91e8cc4fca981b24709821f086.jpg'
            value: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg'
        },
        // imageHeight: {
        //     type: Number,
        //     value: 0
        // },
        // imageWidth: {
        //     type: Number,
        //     value: 0
        // },
        // imageRate: {
        //     type: Number,
        //     value: 0
        // }
    },
    data: {
        canvasHeight: 528,
        canvasWidth: 414,
        canvasTop: 0,
        canvasLeft: 0,
        imageLeft: 0,
        imageHeight: 0,
        imageWidth: 0,
        imageTop: 0,
        testImage: ''
    },
    async attached() {
        this.init()
    },
    methods: {
        async init() {
            // await this.initApp()
            // await this.onDealImage()
            await this.initImage()
            this.initCanvas()

        },  
        async onDealImage() {
            const { height, width } = await this.onGetSelectImageStyles('#content-image')
            if (this.data.imageHeight >= height || this.data.imageWidth >= width) {
                if (this.onCompare(this.data.imageHeight, height) >= this.onCompare(this.data.imageWidth, width)) {
                    this.setData({
                        imageHeight: height,
                        imageWidth: height / this.data.imageRate
                    })
                } else {
                    this.setData({
                        imageHeight: width * this.data.imageRate,
                        imageWidth: width
                    })
                }
            }
        },
        onCompare(currentHeight, allHeight) {
            return currentHeight / allHeight
        },
        initApp() {
            let _this = this
            console.log(3)
            return new Promise((resolve, reject) => {
                wx.getSystemInfo({
                    success(res) {
                        const { width, height } = res.safeArea
                        _this.setData({
                            canvasHeight: height,
                            canvasWidth: width
                        }, () => {
                            resolve()
                        })
                    }
                })
            })
        },
        initCanvas() {
            this.canvas = this.createSelectorQuery()
            this.canvas.select('#myCanvas').fields({ node: true, size: true },
                (res) => {
                    console.log(res, 12123)
                    const { width, height, node } = res
                    const canvas = node
                    canvas.width = width;//本地图像的width
                    canvas.height = height;//本地图像的height
                    const ctx = canvas.getContext('2d')
                    setTimeout(() => {
                        // this.render(canvas, ctx, width, height)
                        console.log(this.data.imageWidth, this.data.imageHeight)
                        this.render(canvas, ctx, this.data.imageWidth, this.data.imageHeight)
                    }, 200);
                    const img = canvas.createImage()
                    img.onload = () => {
                        this._img = img
                    }
                    img.src = this.data.imageUrl
                    this.data.canvas = canvas
                })
            this.canvas.exec()
        },
        render(canvas, ctx, width, height) {
            if (!this._img) return
            console.log(height, width)
            ctx.drawImage(this._img, this.data.imageLeft, this.data.imageTop, width, height)
        },
        onClipImage(e) {
            let _this = this
            console.log(e, 'test')
            const { width, height, left, top } = e.detail
            let x = this.data.imageLeft
            let y = this.data.imageTop
            console.log(this.data.imageTop, 'top')
            wx.canvasToTempFilePath({
                canvas: this.data.canvas,
                x: left,
                y: top,
                height: height,
                width: width,
                destWidth: width,
                destHeight: height,
                // x: 0,
                // y: 137,
                // // y: top,
                // width: this.data.canvasWidth,
                // height: this.data.canvasHeight,
                // destWidth: this.data.canvasWidth,
                // destHeight: this.data.canvasHeight,
                fileType: 'png',
                canvasId: 'myCanvas',
                quality: 1,
                success(res) {
                    console.log(res.tempFilePath)
                    wx.getFileSystemManager().readFile({
                        filePath: res.tempFilePaths, //选择图片返回的相对路径
                        encoding: 'base64', //编码格式
                        success: res => { //成功的回调
                            console.log('data:image/png;base64,' + res.data)
                        },
                    })

                    // let value = res.tempFilePath.toDataURL()
                    _this.setData({
                        testImage: res.tempFilePath
                        // imageUrl: res
                    })
                    wx.getImageInfo({
                        src: res.tempFilePath,
                        success: function(r) {
                            console.log(r)
                        }
                    })
                    wx.navigateTo({
                        url: `/pages/imageView?url=${res.tempFilePath}`
                    })
                }
            }, _this)
        },
        initImage() {
            console.log(2)
            return new Promise((resolve, reject) => {
                this.curImage = this.createSelectorQuery()
                this.curImage.select('#cur-image').boundingClientRect()
                this.curImage.exec(res => {
                    console.log(res, 'image')
                    const { width, height, top, left } = res[0]
                    this.setData({
                        imageHeight: height,
                        imageWidth: width,
                        imageLeft: left,
                        imageTop: top
                    }, () => {
                        resolve()
                    })
                })
            })
        },
        onGetSelectImageStyles(id) {
            return new Promise((resolve, rejrct) => {
                this.curImage = this.createSelectorQuery()
                this.curImage.select(id).boundingClientRect()
                this.curImage.exec(res => {
                    resolve(res[0])
                })
            })
        },
    }
})
</script>
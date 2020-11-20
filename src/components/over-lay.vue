<config>
{
    "component": true
}
</config>

<style lang='postcss'>
.main {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /* height: 100vh;
    width: 100vw; */
    display: flex;
    flex-direction: column;

    &-footer {
        height: 108pt;
        width: 100%;
        position: relative;

        &-sure {
            height: 64pt;
            width: 64pt;
            display: block;
            margin: 22pt auto;

            image {
                width: 100%;
                height: 100%;
            }
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

    &-content {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;

        &-top, &-bottom {
            background: black;
            opacity: .18;
        }

        &-top {
        }

        &-bottom {
            flex: 1;
        }

        &-middle {
            width: 100%;
            display: flex;

            &-content {
                position: relative;

                image {
                    height: 100%;
                    width: 100%;
                }

                .item {
                    position: absolute;
                    height: 24pt;
                    width: 24pt;
                }

                &-top-left {
                    left: 0;
                    transform: rotate(180deg);
                    top: 0;
                }

                &-top-right {
                    top: 0;
                    right: 0;
                    transform: rotate(-90deg);
                }

                &-bottom-left {
                    bottom: 0;
                    left: 0;
                    transform: rotate(90deg);
                }

                &-bottom-right {
                    bottom: 0;
                    right: 0;
                }
            }

            &-left, &-right {
                background-color: black;
                opacity: .18;
            }

            &-right {
                flex: 1;
            }
        }
    }
    /* background: black;
    opacity: .45; */

    

}
</style>

<template lang=''>
    <view class="main">
        <view class="main-content">
            <view class="main-content-top" style="height: {{topHeight}}px"></view>
            <view class="main-content-middle">
                <view class="main-content-middle-left" style="width: {{middleLeft}}px"></view>
                <view 
                    bindtouchstart="onTouchStart"
                    bindtouchmove="onTouchMove"
                    bindtouchend="onTouchEnd"
                    id="select-image"
                    data-type="image"
                    class="main-content-middle-content"
                    style="width: {{width}}px;height: {{height}}px"
                >
                    <view
                        class="main-content-middle-content-top-left item"
                        catchtouchstart="onTouchStart"
                        catchtouchmove="onTouchMove"
                        catchtouchend="onTouchEnd"
                        data-type="topLeft"
                    >
                        <image src="../assets/frame.png" alt=""></image>
                    </view>
                    <view 
                        class="main-content-middle-content-top-right item"
                        catchtouchstart="onTouchStart"
                        catchtouchmove="onTouchMove"
                        catchtouchend="onTouchEnd"
                        data-type="topRight"
                    >
                        <image src="../assets/frame.png" alt=""></image>
                    </view>
                    <view 
                        class="main-content-middle-content-bottom-left item"
                        catchtouchstart="onTouchStart"
                        catchtouchmove="onTouchMove"
                        catchtouchend="onTouchEnd"
                        data-type="bottomLeft"
                    >
                        <image src="../assets/frame.png" alt=""></image>
                    </view>
                    <view 
                        class="main-content-middle-content-bottom-right item"
                        catchtouchstart="onTouchStart"
                        catchtouchmove="onTouchMove"
                        catchtouchend="onTouchEnd"
                        data-type="bottomRight"
                    >
                        <image src="../assets/frame.png" alt=""></image>
                    </view>
                </view>
                <view class="main-content-middle-right"></view>
            </view>
            <view class="main-content-bottom">
            </view>
        </view>
        <view class="main-footer">
            <view class="main-footer-sure">
                <image src="../assets/sure.png" bindtap="onConfirm" alt=""></image>
            </view>
            <view class="main-footer-remake">重拍</view>
        </view>
    </view>
</template>

<script>
Component({
    properties: {
        topHeight: {
            type: Number,
            value: 50
        },
        middleLeft: {
            type: Number,
            value: 50
        },
        height: {
            type: Number,
            value: 200
        },
        width: {
            type: Number,
            value: 200
        },
        minHeight: {
            type: Number,
            value: 50
        },
        minWidth: {
            type: Number,
            value: 50
        },
        imageHeight: {
            type: Number,
            value: 0
        },
        imageWidth: {
            type: Number,
            value: 0
        },
        imageStartX: {
            type: Number,
            value: 0
        },
        imageStartY: {
            type: Number,
            value: 0
        }
    },
    data: {
        moveFlag: false,
        imageX: 0,
        imageY: 0,
        bottomRightX: 0,
        bottomRightY: 0,
        bottomLeftX: 0,
        bottomLeftY: 0,
        topLeftX: 0,
        topLeftY: 0,
        topRightX: 0,
        topRightY: 0,
        timer: true
    },
    ready() {
        console.log(this)
    },
    methods: {
        onTouchEnd(e) {
            this.data.moveFlag = false
            const { type } = e.currentTarget.dataset
            this.data[type + 'X'] = 0
            this.data[type + 'Y'] = 0
        },
        throttle(fn, delay) {
            let timer = null
            return function() {
                if (timer) {
                    return
                }
                timer = setTimeout(() => {
                    clearTimeout(timer)
                    fn()
                }, delay);
            }
        },
        async onTouchMove(e) {
            if (this.data.moveFlag) {
                if (this.data.timer) {
                    // this.data.timer = false
                    // this.throttle(async () => {
                    //     const { clientX, clientY } = e.touches[0]
                    //     const { type } = e.currentTarget.dataset
                    //     let width = clientX - this.data[type + 'X']
                    //     let height = clientY - this.data[type + 'Y']
                    //     await this.onDealImageMove(type, width, height)
                    //     this.data.timer = true
                    //     this.data[type + 'X'] = clientX
                    //     this.data[type + 'Y'] = clientY
                    // }, 25)()
                    this.data.timer = true
                    const { clientX, clientY } = e.touches[0]
                    const { type } = e.currentTarget.dataset
                    let width = clientX - this.data[type + 'X']
                    let height = clientY - this.data[type + 'Y']
                    this.data.timer = false
                    await this.onDealImageMove(type, width, height, clientX, clientY)
                    this.data.timer = true
                    this.data[type + 'X'] = clientX
                    this.data[type + 'Y'] = clientY
                }
            }
        },
        onDealImageMove(type, currentClientX, currentClientY, clientX, clientY) {
            let leftValue =  this.onGetSuitValue(this.data.middleLeft + currentClientX, this.data.imageStartX)
            let topValue = this.onGetSuitValue(this.data.topHeight + currentClientY, this.data.imageStartY)
            if (this.data.width - currentClientX <= this.data.minWidth) {
                console.log(this.data.width, currentClientX, leftValue)
                leftValue = this.data.middleLeft + this.data.width - this.data.minWidth
            }
            if (this.data.height - currentClientY <= this.data.minHeight) {
                topValue = this.data.topHeight + this.data.height - this.data.minHeight
            }
            return new Promise(async (resolve, reject) => {
                switch (type) {
                    case 'image': 
                        let middleValue = this.onSetLocation(this.data.middleLeft + currentClientX, this.data.imageStartX, this.data.imageWidth, this.data.width, 'width') || [null, false]
                        let topValues = this.onSetLocation(this.data.topHeight + currentClientY, this.data.imageStartY, this.data.imageHeight, this.data.height, 'height') || [null, false]
                        this.onSetData({
                            topHeight: topValues[0],
                            middleLeft: middleValue[0]
                        }, resolve)
                        break
                    case 'bottomRight': 
                        {
                            let targetWidth = this.data.width + currentClientX
                            let allShadowWidth = this.data.middleLeft + this.data.width + currentClientX
                            let allImageWidth = this.data.imageWidth + this.data.imageStartX
                            let targetHeight = this.data.height + currentClientY
                            let allShadowHeight = this.data.topHeight + this.data.height + currentClientY
                            let allImageHeight = this.data.imageHeight + this.data.imageStartY
                            // const value = this.data.middleLeft === this.data.imageStartX
                            //  ? allShadowWidth >= allImageWidth
                            //   ? currentClientX <= 0
                            //    ? targetWidth
                            //     : this.data.imageWidth
                            //    : targetWidth
                            //  : allShadowWidth >= allImageWidth
                            //   ? currentClientX <= 0
                            //    ? targetWidth
                            //     : this.data.width
                            //   : targetWidth
                            let heightValue = this.onGetCurrentWidth(this.data.topHeight, this.data.imageStartY, allShadowHeight, allImageHeight, targetHeight, currentClientY, this.data.imageHeight, this.data.minHeight, this.data.height)
                            let widthValue = this.onGetCurrentWidth(this.data.middleLeft, this.data.imageStartX, allShadowWidth, allImageWidth, targetWidth, currentClientX, this.data.imageWidth, this.data.minWidth, this.data.width)
                            this.onSetData({
                                width: widthValue,
                                height: heightValue
                            }, resolve)
                        }
                        break
                    case 'topLeft': 
                        {
                            let targetWidth = this.data.width - currentClientX
                            let targetHeight = this.data.height - currentClientY
                            const { left, top } = await this.onGetSelectImageStyles('#select-image')
                            let widthValue = this.onGetPlusNumber(this.data.middleLeft, this.data.imageStartX, currentClientX, left, this.data.width, this.data.minWidth, targetWidth)
                            let heightValue = this.onGetPlusNumber(this.data.topHeight, this.data.imageStartY, currentClientY, top, this.data.height, this.data.minHeight, targetHeight)
                            this.onSetData({
                                width: widthValue,
                                height: heightValue,
                                middleLeft: leftValue,
                                topHeight: topValue
                                // middleLeft: this.data.minWidth === this.data.width ? this.data.middleLeft : this.onGetSuitValue(this.data.middleLeft + currentClientX, this.data.imageStartX),
                                // topHeight: this.data.minHeight === this.data.height ? this.data.topHeight : this.onGetSuitValue(this.data.topHeight + currentClientY, this.data.imageStartY)
                            }, resolve)
                        }
                        break
                    case 'bottomLeft':
                        {
                            let targetWidth = this.data.width - currentClientX
                            let targetHeight = this.data.height + currentClientY
                            const { left, top } = await this.onGetSelectImageStyles('#select-image')
                            let allShadowHeight = this.data.topHeight + this.data.height + currentClientY
                            let allImageHeight = this.data.imageHeight + this.data.imageStartY
                            let widthValue = await this.onGetPlusNumber(this.data.middleLeft, this.data.imageStartX, currentClientX, left, this.data.width, this.data.minWidth, targetWidth)
                            let heightValue = this.onGetCurrentWidth(this.data.topHeight, this.data.imageStartY, allShadowHeight, allImageHeight, targetHeight, currentClientY, this.data.imageHeight, this.data.minHeight, this.data.height)
                            this.onSetData({
                                width: widthValue,
                                height: heightValue,
                                middleLeft: leftValue
                            }, resolve)
                        }
                        break
                    case 'topRight':
                        let targetWidth = this.data.width + currentClientX
                        let allShadowWidth = this.data.middleLeft + this.data.width + currentClientX
                        let allImageWidth = this.data.imageWidth + this.data.imageStartX
                        const { left, top } = await this.onGetSelectImageStyles('#select-image')
                        let targetHeight = this.data.height - currentClientY
                        let widthValue = this.onGetCurrentWidth(this.data.middleLeft, this.data.imageStartX, allShadowWidth, allImageWidth, targetWidth, currentClientX, this.data.imageWidth, this.data.minWidth, this.data.width)
                        let heightValue = await this.onGetPlusNumber(this.data.topHeight, this.data.imageStartY, currentClientY, top, this.data.height, this.data.minHeight, targetHeight)
                        this.onSetData({
                            height: heightValue,
                            width: widthValue,
                            topHeight: topValue
                        }, resolve)
                        break
                    default: 
                        resolve({})
                        break
                }
            })
        },
        onGetPlusNumber(currentlen, imageLen, typeNumber, values, currentValue, minValue, targetValue) {
            if (currentlen !== imageLen && currentlen + typeNumber <= imageLen && typeNumber < 0) {
                currentValue = parseFloat(currentValue) + parseFloat(values) - imageLen
            }
            let value = currentlen + typeNumber <= imageLen
                ? currentValue
                : targetValue
            return this.onGetSuitValue(value, minValue)
        },
        onGetCurrentWidth(currentLen, imagelen, allCurrentLen, allImageLen, targetLen, typeNumber, currentImageLen, currentImageMinLen, currentWidth) {
            let value = currentLen === imagelen
             ? allCurrentLen >= allImageLen
              ? typeNumber <= 0
               ? targetLen
                : currentImageLen
               : targetLen
              : allCurrentLen >= allImageLen
             ? typeNumber <= 0
              ? targetLen
               : currentWidth
             : targetLen
            return this.onGetSuitValue(value, currentImageMinLen)
        },
        onTestIsEdge(flag, currentLen, imageStart, currentValue, imageValue) {
            if (currentLen === imageStart) {
                if (currentValue <= imageValue) {
                    return true
                }
            } else {
                if (currentValue + currentLen < imageValue + imageStart) {
                    return true 
                } else {
                    return flag ? false : true
                }
            }
        },
        onSetLocation(targetValue, start, allLength, currentValue, type) {
            // console.log(arguments)
            if (targetValue <= start) {
                return [start, false]
            } else if (targetValue + currentValue >= allLength + start) {
                return [allLength + start - currentValue, false]
            }
            return [targetValue, true]
        },
        onGetSuitValue(targetValue, minValue) {
            return targetValue <= minValue ? minValue : targetValue
        },
        onSetData(params, callback) {
            console.log(params, 111, this.data.imageWidth)
            this.setData(params, () => {
                callback()
            })
        },
        onTouchStart(e) {
            this.data.moveFlag = true
            this.data.timer = true
            const { clientX, clientY } = e.touches[0]
            const { type } = e.currentTarget.dataset
            this.data[type + 'X'] = clientX
            this.data[type + 'Y'] = clientY
            console.log(e)
        },
        async onConfirm() {
            const { width = 0, height = 0, top = 0, left = 0 } = await this.onGetSelectImageStyles('#select-image')
            console.log(width, height, top, left)
            this.triggerEvent("onClipImage", {
                width,
                height,
                top,
                left
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
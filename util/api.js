const baes_url = "http://localhost:3000"
export const apiRequest = (options) => {
	// 显示加载中效果
	uni.showLoading({
	    title: '加载中',
		mask:true
	});
	return new Promise((resolve, reject) => {
		uni.request({
			url: baes_url + options.url,
			method: options.method || "GET",
			data: options.data || {},
			success: (res) => {
				if (res.data.code !== 200) {
					return uni.showToast({
						title: "获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			},
			complete: () => {
				// 关闭加载图标
				  uni.hideLoading();
			}
		})
	})
}

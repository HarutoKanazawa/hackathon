function initMap() {

  // 現在地を取得を成功したときの処理
	function success(pos) {
		const lat = pos.coords.latitude;
		const lng = pos.coords.longitude;
		const latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度

    // 地図を作成
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: latlng
		});

    // マーカーを作成
		const marker = new google.maps.Marker({
			position: latlng, //マーカーの位置（必須）
			map: map //マーカーを表示する地図
		});
	}

  // 現在地の取得を失敗したときの処理
	function fail(error) {
		alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
		const latlng = new google.maps.LatLng(35.6812405, 139.7649361); //東京駅
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: latlng
		});
	}

  // 呼び出し
	navigator.geolocation.getCurrentPosition(success, fail);
}

initMap();
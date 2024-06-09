// 案内画面 js
function initMap() {
	var latlng = new google.maps.LatLng(35.6843218, 139.70311200000003); //中心の緯度, 経度
	var map = new google.maps.Map(document.getElementById('maps'), {
		zoom: 17,
		center: latlng
	});

	var yoyogi = new google.maps.LatLng(35.683049, 139.702055);
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();

	var request = {
		origin: yoyogi, //スタート地点
		destination: latlng, //ゴール地点
		waypoints: [ //経由地点
			{location: new google.maps.LatLng(35.683021,139.702668), stopover: false}
		],
		travelMode: google.maps.DirectionsTravelMode.WALKING, //移動手段
	};

	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsRenderer.setOptions({
				preserveViewport: true //ズーム率を変更してルート全体を表示しない
			});
			// ルート検索の結果を地図上に描画
			directionsRenderer.setDirections(result);
			directionsRenderer.setMap(map);
		}
	});
}
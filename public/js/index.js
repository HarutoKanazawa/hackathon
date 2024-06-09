// マップを表示
const initMap = () => {

  // 現在地を取得を成功したときの処理
	const success = (pos) => {
		const lat = pos.coords.latitude;
		const lng = pos.coords.longitude;
		const latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度

    // 地図を作成
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: latlng
		});

    // マーカーを作成
		const marker = new google.maps.marker.AdvancedMarkerElement({
			position: latlng, //マーカーの位置（必須）
			map: map //マーカーを表示する地図
		});
	}

  // 現在地の取得を失敗したときの処理
	const fail = (error) =>  {
		alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
		const latlng = new google.maps.LatLng(35.6812405, 139.7649361); //東京駅
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: latlng
		});
	}

	navigator.geolocation.getCurrentPosition(success, fail);
}

// 呼び出し
initMap();

// モーダルを表示
document.addEventListener('DOMContentLoaded', () => {
	const modal = document.querySelector('js-modal');
	const mOpen = document.querySelector('js-modal-open');
	const mClose = document.querySelector('js-modal-close');

	//「開くボタン」をクリックしてモーダル
	const modalOpen = () => {modal.classList.add('is-active')};
	mOpen.addEventListener('click', modalOpen);



	//「閉じるボタン」をクリックしてモーダルを閉じる
	const modalClose = () => modal.classList.remove('is-active');
	mClose.addEventListener('click', modalClose);

	//「モーダルの外側」をクリックしてモーダルを閉じる
	const modalOut = (evt) => {
		if (evt.target == modal) modal.classList.remove('is-active');
	}
addEventListener('click', modalOut);
})

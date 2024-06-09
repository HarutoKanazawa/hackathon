let search;
const clickplace = document.getElementById("clickplace");
class Search {
    constructor() {
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 35.6811673, lng: 139.7670516 },
            zoom: 8,
        });
        // サーチボックスの作成
        this.input = document.getElementById("search-box");
        this.searchBox = new google.maps.places.SearchBox(this.input);
        // マーカーを入れる配列
        this.markers = [];
        // 選択されたマーカー
        this.selectedmaeker;
        // サーチボックスの配置
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.input);
        // 地図が変わった時に検索範囲を変える
        this.map.addListener("bounds_changed", () => {
            this.searchBox.setBounds(this.map.getBounds());
        });
        document.getElementById("guidestartbutton").addEventListener("click", this.selectedplace.bind(this));
        document.getElementById("cancelbutton").addEventListener("click", this.selectplacecencel.bind(this)); 
        this.searchBox.addListener("places_changed", this.completeplace.bind(this));
    }

    selectedplace(){
        document.getElementById("clickplace").style.display = "none";
        console.log(this.selectedmaeker.getTitle());
    }

    selectplacecencel(){
        document.getElementById("clickplace").style.display = "none";
        console.log("cancel");
    }

    completeplace(){
        //ユーザが選択した場所の情報
        const places = this.searchBox.getPlaces();
        // 選択されたものの情報がない場合
        if (places.length == 0) {
            return;
        }
        this.markers.forEach((marker) => {
            // すでにある地図上のマーカーを削除＆関連付けられたイベントリスナーも削除
            marker.setMap(null);
        });
        // マーカーを削除
        this.markers = [];
        // 地図上の緯度経度の範囲
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place,index) => {
            // place.geometryはlocation: 場所の緯度と経度を表す，viewport: 場所が含まれるビューポート（地図の表示領域）を表す，bounds: 場所が含まれるビューボックス（地図の視野）を表す（場所のビューポートと同じである場合があります）。
            // place.geometry.locationは場所が地図上のどこにあるか
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            // マーカーは地図上の特定の場所を示すオブジェクト．アイコンはただの画像
            const icon = {
                // レストラン、ホテル、公園などの場所にはそれぞれ異なるアイコンが関連付け
                url: place.icon,
                // 画像の大きさ
                size: new google.maps.Size(71, 71),
                // アイコン画像の左上隅の座標
                origin: new google.maps.Point(0, 0),
                // アイコン画像の中でマーカーの基準点となる位置（アイコン画像の中央の下部（底辺の中央）に位置）
                anchor: new google.maps.Point(17, 34),
                // マーカーアイコンのサイズ
                scaledSize: new google.maps.Size(25, 25),
            };
            // マーカーに情報をいれる
            this.markers.push(
                new google.maps.Marker({
                    map: this.map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            this.markers[index].addListener('click', () => {  
                // マーカーがクリックされたときの処理をここに記述
                document.getElementById("clickplace").style.display = "block";
                this.selectedmaeker=this.markers[index];
                document.getElementById("placeinformation").innerText = this.selectedmaeker.getTitle();
            });
            // 検索された場所を表示する
            // place.geometry.viewport=trueなら今表示されている画面にplaceがあるということ
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        // 指定された表示領域に合わせる（上４行で表示領域が変わっている）
        this.map.fitBounds(bounds);
    }
}

window.addEventListener('load', () => {
    // 初期表示時点でいくつかのオブジェクトを非表示にする
    search = new Search();
});
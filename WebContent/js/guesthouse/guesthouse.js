var guestMap;
var guestMarkerPosition;
var guestMarker;
var address;
var name;

$(document).ready(function () {
	address = $('#guestMap').attr('data-address');
	name = $('#guestName').attr('data-name');
	searchGuesthouseByAddress(address);
});

function showGuestMap(guestCoords) {
	
	var guestMapContainer = document.getElementById('guestMap'), // 지도를 표시할 div 
    guestMapOption = { 
        center: guestCoords, // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

	guestMap = new daum.maps.Map(guestMapContainer, guestMapOption); // 지도를 생성합니다
	
	// 마커가 표시될 위치입니다 
	guestMarkerPosition = guestCoords; 
	
	// 마커를 생성합니다
	guestMarker = new daum.maps.Marker({
	    position: guestMarkerPosition
	});
	
	// 마커가 지도 위에 표시되도록 설정합니다
	guestMarker.setMap(guestMap);
	
    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	guestMap.setCenter(guestCoords);
	
    // 인포윈도우로 장소에 대한 설명을 표시합니다
    var guestInfowindow = new daum.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>'
    });
    
    guestInfowindow.open(guestMap, guestMarker);
	
	// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
	var mapTypeControl = new daum.maps.MapTypeControl();

	// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
	// daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
	guestMap.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

	// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
	var zoomControl = new daum.maps.ZoomControl();
	guestMap.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);	
}

function searchGuesthouseByAddress (address) {
	// 주소-좌표 변환 객체를 생성합니다
	var geocoder = new daum.maps.services.Geocoder();	
	var guestCoords;
	// 주소로 좌표를 검색합니다
	geocoder.addressSearch(address, function(result, status) {

	    // 정상적으로 검색이 완료됐으면 
	     if (status === daum.maps.services.Status.OK) {
	    	 guestCoords = new daum.maps.LatLng(result[0].y, result[0].x);
	    	 showGuestMap(guestCoords);
	     }
	});
}
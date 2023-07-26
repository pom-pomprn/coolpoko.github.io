let face_results;
let img; // 挿入する画像


function preload() {
  img = loadImage('poko.PNG'); // 画像を読み込む
}


function setup() {
  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
  gotFaces = function (results) {
    face_results = results;
    adjustCanvas();

    
  }

}

function draw() {
  // 描画処理
  clear();  // これを入れないと下レイヤーにあるビデオが見えなくなる

  // 各頂点座標を表示する
  // 各頂点座標の位置と番号の対応は以下のURLを確認
  // https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
  if (face_results) {
    for (let landmarks of face_results.faceLandmarks) {
      let center = createVector(landmarks[275].x * width, landmarks[275].y * height); // 鼻の位置（仮定）
      let eyeLeft = createVector(landmarks[200].x * width, landmarks[200].y * height); // 左目の位置（仮定）
      let eyeRight = createVector(landmarks[345].x * width, landmarks[345].y * height); // 右目の位置（仮定）

      // 画像を合成する位置を計算
      let imageSize = 550; // 画像のサイズを適宜調整
      let imagePosition = center.copy().sub(createVector(imageSize / 2, imageSize / 2)); // 中心点からオフセットを設定

      // 画像を描画
      image(img, imagePosition.x, imagePosition.y, imageSize, imageSize);
      
    }
     
    }
  }



function windowResized() {
  adjustCanvas();
}

function adjustCanvas() {
  // Get an element by its ID
  var element_webcam = document.getElementById('webcam');
  resizeCanvas(element_webcam.clientWidth, element_webcam.clientHeight);
  //console.log(element_webcam.clientWidth);
}

function audio(audioID) {
  let audioElement = document.getElementById(audioID);
  audioElement.play();
}

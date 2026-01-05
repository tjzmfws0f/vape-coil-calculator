// ワイヤー素材の抵抗率 (Ω·mm²/m)
const WIRE_RESISTIVITY = {
    kanthal: 1.45,
    nichrome: 1.09,
    stainless: 0.75
};

// AWGゲージと直径の対応表 (mm)
const AWG_DIAMETER = {
    24: 0.511,
    26: 0.405,
    28: 0.321,
    30: 0.255,
    32: 0.202
};

function calculateResistance() {
    // 入力値を取得
    const material = document.getElementById('wire-material').value;
    const gauge = parseInt(document.getElementById('wire-gauge').value);
    const coilDiameter = parseFloat(document.getElementById('coil-diameter').value);
    const wraps = parseInt(document.getElementById('wraps').value);
    const coilCount = parseInt(document.getElementById('coil-count').value);
    
    // ワイヤー直径を取得
    const wireDiameter = AWG_DIAMETER[gauge];
    
    // ワイヤーの断面積を計算 (mm²)
    const crossSectionalArea = Math.PI * Math.pow(wireDiameter / 2, 2);
    
    // 1巻きあたりの長さを計算 (mm)
    const lengthPerWrap = Math.PI * coilDiameter;
    
    // 総ワイヤー長を計算 (mm)
    const totalLength = lengthPerWrap * wraps;
    
    // 1つのコイルの抵抗値を計算 (Ω)
    const singleCoilResistance = (WIRE_RESISTIVITY[material] * totalLength) / (crossSectionalArea * 1000);
    
    // 最終的な抵抗値を計算（並列接続の場合）
    const finalResistance = singleCoilResistance / coilCount;
    
    // 結果を表示
    document.getElementById('resistance-result').textContent = 
        `${finalResistance.toFixed(2)} Ω`;
    
    document.getElementById('wire-length').textContent = 
        `ワイヤー長: ${(totalLength * coilCount / 10).toFixed(1)} cm`;
}

// ページ読み込み時に初期計算を実行
document.addEventListener('DOMContentLoaded', function() {
    calculateResistance();
});

// 入力値が変更されたときに自動計算
document.addEventListener('change', function(e) {
    if (e.target.matches('input, select')) {
        calculateResistance();
    }
});

document.addEventListener('input', function(e) {
    if (e.target.matches('input[type="number"]')) {
        calculateResistance();
    }
});
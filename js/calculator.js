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
    27: 0.361
};

function calculateResistance() {
    const material = document.getElementById('wire-material').value;
    const gauge = parseInt(document.getElementById('wire-gauge').value);
    const coilDiameter = parseFloat(document.getElementById('coil-diameter').value);
    const wraps = parseInt(document.getElementById('wraps').value);
    const coilCount = parseInt(document.getElementById('coil-count').value);
    
    // 入力値の検証
    if (!coilDiameter || !wraps || coilDiameter <= 0 || wraps <= 0) {
        document.getElementById('resistance-result').textContent = '入力値を確認してください';
        document.getElementById('wire-length').textContent = '';
        return;
    }
    
    const wireDiameter = AWG_DIAMETER[gauge];
    const crossSectionalArea = Math.PI * Math.pow(wireDiameter / 2, 2);
    const lengthPerWrap = Math.PI * coilDiameter;
    const totalLength = lengthPerWrap * wraps;
    const singleCoilResistance = (WIRE_RESISTIVITY[material] * totalLength) / (crossSectionalArea * 1000);
    const finalResistance = singleCoilResistance / coilCount;
    
    document.getElementById('resistance-result').textContent = `${finalResistance.toFixed(3)} Ω`;
    document.getElementById('wire-length').textContent = `ワイヤー長: ${(totalLength * coilCount / 10).toFixed(1)} cm`;
}

// 初期計算とイベントリスナー
document.addEventListener('DOMContentLoaded', calculateResistance);
document.addEventListener('change', function(e) {
    if (e.target.matches('input, select')) calculateResistance();
});
document.addEventListener('input', function(e) {
    if (e.target.matches('input[type="number"]')) calculateResistance();
});
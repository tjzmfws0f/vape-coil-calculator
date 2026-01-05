// VAPE一般的な組み合わせ参考値テーブル
const VAPE_REFERENCE = {
    kanthal: {
        24: { base: 0.15, perWrap: 0.08 },
        26: { base: 0.25, perWrap: 0.12 },
        27: { base: 0.32, perWrap: 0.15 }
    },
    nichrome: {
        24: { base: 0.12, perWrap: 0.06 },
        26: { base: 0.20, perWrap: 0.10 },
        27: { base: 0.25, perWrap: 0.12 }
    },
    stainless: {
        24: { base: 0.08, perWrap: 0.04 },
        26: { base: 0.13, perWrap: 0.065 },
        27: { base: 0.16, perWrap: 0.08 }
    }
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
    
    if (!coilDiameter || !wraps || coilDiameter <= 0 || wraps <= 0) {
        document.getElementById('result-section').style.display = 'none';
        return;
    }
    
    const ref = VAPE_REFERENCE[material][gauge];
    const diameterFactor = coilDiameter / 3.0; // 3mmを基準
    const singleCoilResistance = (ref.base + ref.perWrap * wraps) * diameterFactor;
    const finalResistance = singleCoilResistance / coilCount;
    
    const wireLength = Math.PI * coilDiameter * wraps / 10;
    
    document.getElementById('resistance-result').textContent = `${finalResistance.toFixed(2)} Ω`;
    document.getElementById('wire-length').textContent = `ワイヤー長: ${wireLength.toFixed(1)} cm`;
    document.getElementById('result-section').style.display = 'block';
}

// 初期計算を削除し、イベントリスナーのみ設定
document.addEventListener('change', function(e) {
    if (e.target.matches('input, select')) calculateResistance();
});
document.addEventListener('input', function(e) {
    if (e.target.matches('input[type="number"]')) calculateResistance();
});
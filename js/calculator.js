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
    
    // VAPEスタイルとリキッド推奨を判定
    let vapeStyle = '';
    if (finalResistance >= 0.8) {
        vapeStyle = 'MTL・RDL向き | 推奨リキッド: VG/PG 50/50〜60/40';
    } else if (finalResistance >= 0.6) {
        vapeStyle = 'RDL向き | 推奨リキッド: VG/PG 60/40〜70/30';
    } else {
        vapeStyle = 'RDL・DL向き | 推奨リキッド: VG/PG 70/30〜80/20';
    }
    
    document.getElementById('resistance-result').textContent = `${finalResistance.toFixed(2)} Ω`;
    document.getElementById('wire-length').textContent = `ワイヤー長: ${wireLength.toFixed(1)} cm`;
    document.getElementById('vape-style').textContent = vapeStyle;
    document.getElementById('result-section').style.display = 'block';
}

function clearResults() {
    document.getElementById('result-section').style.display = 'none';
}

function saveBuild() {
    const atomizer = document.getElementById('atomizer-name').value;
    const liquid = document.getElementById('liquid-name').value;
    
    if (!atomizer || !liquid) {
        alert('アトマイザー名とリキッド名を入力してください');
        return;
    }
    
    const build = {
        date: new Date().toLocaleDateString('ja-JP'),
        material: document.getElementById('wire-material').options[document.getElementById('wire-material').selectedIndex].text,
        gauge: document.getElementById('wire-gauge').value + ' AWG',
        diameter: document.getElementById('coil-diameter').value + 'mm',
        wraps: document.getElementById('wraps').value + '巻',
        coilCount: document.getElementById('coil-count').options[document.getElementById('coil-count').selectedIndex].text,
        resistance: document.getElementById('resistance-result').textContent,
        atomizer: atomizer,
        liquid: liquid
    };
    
    let builds = JSON.parse(localStorage.getItem('vapeBuilds') || '[]');
    builds.unshift(build);
    localStorage.setItem('vapeBuilds', JSON.stringify(builds));
    
    document.getElementById('atomizer-name').value = '';
    document.getElementById('liquid-name').value = '';
    
    displayHistory();
    alert('ビルドを保存しました！');
}

function displayHistory() {
    const builds = JSON.parse(localStorage.getItem('vapeBuilds') || '[]');
    const historyDiv = document.getElementById('build-history');
    
    if (builds.length === 0) {
        historyDiv.innerHTML = '<p>保存されたビルドはありません</p>';
        return;
    }
    
    historyDiv.innerHTML = builds.map((build, index) => `
        <div class="build-item">
            <div class="build-header">
                <strong>${build.atomizer} + ${build.liquid}</strong>
                <span class="build-date">${build.date}</span>
            </div>
            <div class="build-details">
                ${build.material} ${build.gauge} | ${build.diameter} ${build.wraps} | ${build.coilCount}<br>
                <strong>${build.resistance}</strong>
            </div>
            <button onclick="deleteBuild(${index})" class="delete-btn">削除</button>
        </div>
    `).join('');
}

function deleteBuild(index) {
    let builds = JSON.parse(localStorage.getItem('vapeBuilds') || '[]');
    builds.splice(index, 1);
    localStorage.setItem('vapeBuilds', JSON.stringify(builds));
    displayHistory();
}

// ページ読み込み時に履歴を表示
document.addEventListener('DOMContentLoaded', displayHistory);

// 初期計算を削除し、イベントリスナーを削除（ボタンクリック時のみ計算）
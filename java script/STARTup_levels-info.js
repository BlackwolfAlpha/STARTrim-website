async function loadStageInfo(language) {
    try {
        const response = await fetch('Data/stages_info.json');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        return data.stages;
    } catch (error) {
        console.error('Error loading stage info:', error);
        return [];
    }
}
function showStageInfo(stageId, stages, language) {
    const stageInfo = stages.find(stage => stage.id === stageId);
    const stageInfoDiv = document.getElementById(stageId);

    document.querySelectorAll('.stage-info').forEach(div => {
        div.style.display = 'none';
        div.innerHTML = '';
    });

    if (stageInfo) {
        stageInfoDiv.innerHTML = `
            <section class="section-explanation">
                <section class="section-stage">
                    <div class="stage-info-title">
                        <h2>${stageInfo.title[language] || stageInfo.title['en'] || 'Title not available'}</h2>
                        <p>${stageInfo.shortExplanation[language] || stageInfo.shortExplanation['en'] || 'Explanation not available'}</p>
                    </div>
                </section>
                <div class="challenges-stage">
                    <section class="section-challenges">
                        <div class="section-challenges__header">
                            <h3>${stageInfo.challengesTitle[language] || stageInfo.challengesTitle['en'] || 'Challenges'}</h3>
                            <p>${stageInfo.challengesDetails[language] || stageInfo.challengesDetails['en'] || 'Details not available'}</p>
                        </div>
                        <div class="section-challenges__body">
                            <div class="section-challenges__category">
                                ${stageInfo.challengesList[language]?.map((challenge, index) => `
                                    <button class="challenge-button" data-index="${index}">
                                        <span class="challenge-button__label">${challenge}</span>
                                    </button>
                                `).join('') ||
                                stageInfo.challengesList['en']?.map((challenge, index) => `
                                    <button class="challenge-button" data-index="${index}">
                                        <span class="challenge-button__label">${challenge}</span>
                                    </button>
                                `).join('') ||
                                '<button class="challenge-button"><span class="challenge-button__label">No challenges available</span></button>'}
                            </div>
                            <div class="challenge-explanation" id="challenge-explanation" style="display: none;">
                                <h4 class="challenge-title"></h4> <!-- Title for the challenge -->
                                <p class="challenge-description"></p> <!-- Explanation for the challenge -->
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        `;

        const challengeButtons = stageInfoDiv.querySelectorAll('.challenge-button');
        challengeButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const explanationDiv = stageInfoDiv.querySelector('#challenge-explanation');
                const challengeName = button.querySelector('.challenge-button__label').textContent;

                explanationDiv.querySelector('.challenge-title').textContent = challengeName;
                explanationDiv.querySelector('.challenge-description').innerHTML = stageInfo.challengesExplanations[language]?.[index] ||
                    stageInfo.challengesExplanations['en']?.[index] || 'No explanation available.';

                explanationDiv.style.display = 'block';
            });
        });

        stageInfoDiv.style.display = 'block';
    }
}

function setupEventListeners(stages, language) {
    const buttons = [
        'ideation-btn',
        'pre-seed-btn',
        'seed-btn',
        'early-stage-btn',
        'growth-stage-btn',
        'ipo-btn'
    ];

    buttons.forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', function(event) {
            event.preventDefault();
            const stageId = buttonId.replace('-btn', '-info');
            showStageInfo(stageId, stages, language);
        });
    });
}

const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
loadStageInfo(preferredLanguage).then(stages => {
    setupEventListeners(stages, preferredLanguage);
    showStageInfo('ideation-info', stages, preferredLanguage);

    const languageSelector = document.getElementById('language-selector');
    languageSelector.value = preferredLanguage;

    languageSelector.addEventListener('change', function() {
        const newLanguage = this.value;
        localStorage.setItem('preferredLanguage', newLanguage);

        loadStageInfo(newLanguage).then(updatedStages => {
            setupEventListeners(updatedStages, newLanguage);
            showStageInfo('ideation-info', updatedStages, newLanguage);
        });
    });
});



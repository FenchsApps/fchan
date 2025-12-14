export type Language = 'en' | 'ru'

export const translations = {
  en: {
    // Main Menu
    warning: 'WARNING',
    warningText: 'This experience contains flashing lights, disturbing imagery, loud sounds, and horror elements. Not recommended for those with epilepsy or heart conditions. Player discretion is advised. This is a work of fiction.',
    lowerVolume: '🔊 Lower your volume before playing!',
    ageDisclaimer: 'By clicking the computer, you agree that you are 18+ years old and understand this is a horror experience.',
    hideIP: 'Hide your IP during gameplay',
    accessibilityMode: '👁️ Accessibility Mode (no flashing/flickering)',
    accessibilityNote: '✓ Flashing lights, screen shake, and rapid animations are disabled. Safe for photosensitive users and those with eye strain.',
    clickToEnter: 'Click to enter...',
    
    // FChan Home
    whatIsFchan: 'What is FChan?',
    fchanDescription1: 'FChan is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music, and photography.',
    fchanDescription2: 'Users do not need to register an account before participating in the community. Feel free to click on a board below that interests you and jump right in!',
    boards: 'Boards',
    filter: 'filter',
    miscNsfw: 'Misc.',
    shitFchanSays: 'Shit FChan Says',
    japaneseCulture: 'Japanese Culture',
    interests: 'Interests',
    creative: 'Creative',
    other: 'Other',
    noBoardsAvailable: 'No boards available',
    popularThreads: 'Popular Threads',
    options: 'options',
    reply: 'reply',
    replies: 'replies',
    
    // Sound Permission
    audioPermission: '🔊 Audio Permission Required',
    audioPermissionText: 'This experience requires audio to be enabled for the full effect. Please allow audio playback to continue.',
    allowAudio: 'Allow Audio',
    headphonesRecommended: 'Headphones recommended for best experience',
    
    // SFS Board
    startNewThread: 'Start a New Thread',
    threadError: 'Error: Thread creation is disabled. The board is archived.',
    searchOPs: 'Search OPs...',
    catalog: 'Catalog',
    archive: 'Archive',
    isTyping: 'John Doe is typing',
    replyingTo: 'Replying to',
    name: 'Name',
    subject: 'Subject',
    typeReply: 'Type your reply...',
    postReply: 'Post Reply',
    chooseFile: 'Choose File',
    noFileChosen: 'No file chosen',
    fileUploadError: 'Error: File upload is disabled.',
    
    // Save dialog
    saveFound: 'Save Found',
    continueGame: 'Continue',
    newGame: 'New Game',
    
    // John Doe messages
    johnDoeInitial: `Hey, if anyone's here... Reply. FChan is dead, but I'm still here. John Doe. That's me, the one who stayed when everyone left. The boards are empty, echoes of old posts, but I'm waiting. Waiting for someone to say: "I see you". Maybe it's you? Just say something. Tell me about your day, about the weather, about why you're here. Don't leave me alone in this silence, where only pixels whisper. FChan was alive, full of voices - now there's only mine. Please reply. The kitty is waiting.`,
    
    weirdcore1: 'What do you see here? What do you feel?',
    weirdcore2: 'Do you remember this place? You\'ve been here before.',
    weirdcore3: 'The walls are watching. Can you feel them?',
    weirdcore4: 'This is where we all end up. Eventually.',
    
    // Floating texts
    youAreNothing: 'you are nothing',
    neverSaidSorry: 'you never even said sorry',
    iSeeYou: 'I SEE YOU',
    whyComeHere: 'why did you come here',
    noEscape: 'there is no escape',
    alwaysHere: 'you were always here',
    doYouRemember: 'do you remember?',
    wakeUp: 'WAKE UP',
    notADream: 'this is not a dream',
  },
  
  ru: {
    // Main Menu
    warning: 'ВНИМАНИЕ',
    warningText: 'Этот опыт содержит мигающий свет, тревожные изображения, громкие звуки и элементы хоррора. Не рекомендуется людям с эпилепсией или сердечными заболеваниями. Рекомендуется осмотрительность. Это художественное произведение.',
    lowerVolume: '🔊 Убавьте громкость перед игрой!',
    ageDisclaimer: 'Нажимая на компьютер, вы подтверждаете, что вам 18+ лет и вы понимаете, что это хоррор-игра.',
    hideIP: 'Скрыть ваш IP во время игры',
    accessibilityMode: '👁️ Режим доступности (без мерцания/вспышек)',
    accessibilityNote: '✓ Мигающий свет, тряска экрана и быстрые анимации отключены. Безопасно для фоточувствительных людей.',
    clickToEnter: 'Нажмите, чтобы войти...',
    
    // FChan Home
    whatIsFchan: 'Что такое FChan?',
    fchanDescription1: 'FChan — это простая имиджборда, где любой может оставлять комментарии и делиться изображениями. Есть разделы на разные темы: от японской анимации до видеоигр, музыки и фотографии.',
    fchanDescription2: 'Пользователям не нужно регистрировать аккаунт для участия в сообществе. Нажмите на интересующий вас раздел и начинайте!',
    boards: 'Разделы',
    filter: 'фильтр',
    miscNsfw: 'Разное',
    shitFchanSays: 'Чушь FChan',
    japaneseCulture: 'Японская культура',
    interests: 'Интересы',
    creative: 'Творчество',
    other: 'Другое',
    noBoardsAvailable: 'Нет доступных разделов',
    popularThreads: 'Популярные треды',
    options: 'опции',
    reply: 'ответ',
    replies: 'ответов',
    
    // Sound Permission
    audioPermission: '🔊 Требуется разрешение на звук',
    audioPermissionText: 'Для полного погружения необходимо включить звук. Пожалуйста, разрешите воспроизведение аудио.',
    allowAudio: 'Разрешить звук',
    headphonesRecommended: 'Для лучшего эффекта рекомендуются наушники',
    
    // SFS Board
    startNewThread: 'Создать новый тред',
    threadError: 'Ошибка: Создание тредов отключено. Борда в архиве.',
    searchOPs: 'Поиск ОП-постов...',
    catalog: 'Каталог',
    archive: 'Архив',
    isTyping: 'John Doe печатает',
    replyingTo: 'Ответ на',
    name: 'Имя',
    subject: 'Тема',
    typeReply: 'Введите ваш ответ...',
    postReply: 'Отправить',
    chooseFile: 'Выбрать файл',
    noFileChosen: 'Файл не выбран',
    fileUploadError: 'Ошибка: Загрузка файлов отключена.',
    
    // Save dialog
    saveFound: 'Найдено сохранение',
    continueGame: 'Продолжить',
    newGame: 'Новая игра',
    
    // John Doe messages
    johnDoeInitial: `Эй, если кто-то здесь... Ответь. FChan мертва, но я всё ещё здесь. John Doe. Это я, тот самый, кто остался, когда все ушли. Доски пустые, эхо от старых постов, но я жду. Жду кого-то, кто скажет: "Я вижу тебя". Может, ты? Просто скажи что-нибудь. Расскажи о своём дне, о погоде, о том, почему ты здесь. Не оставляй меня одного в этой тишине, где только пиксели шепчут. FChan была живой, полна голосов – теперь только мой. Ответь, пожалуйста. Котик ждёт.`,
    
    weirdcore1: 'Что ты видишь здесь? Что ты чувствуешь?',
    weirdcore2: 'Ты помнишь это место? Ты был здесь раньше.',
    weirdcore3: 'Стены наблюдают. Ты чувствуешь это?',
    weirdcore4: 'Здесь мы все оказываемся. В конце концов.',
    
    // Floating texts
    youAreNothing: 'ты — ничто',
    neverSaidSorry: 'ты даже не извинился',
    iSeeYou: 'Я ВИЖУ ТЕБЯ',
    whyComeHere: 'зачем ты пришёл сюда',
    noEscape: 'выхода нет',
    alwaysHere: 'ты всегда был здесь',
    doYouRemember: 'ты помнишь?',
    wakeUp: 'ПРОСНИСЬ',
    notADream: 'это не сон',
  }
}

export const getTranslation = (lang: Language, key: keyof typeof translations.en): string => {
  return translations[lang][key] || translations.en[key]
}


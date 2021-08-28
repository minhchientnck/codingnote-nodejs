const clearUnicodeCharacters = s => {
  return s.replace(/Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ/g, 'A')
    .replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, 'O')
    .replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, 'E')
    .replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, 'U')
    .replace(/Í|Ì|Ỉ|Ĩ|Ị/g, 'I')
    .replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, 'Y')
    .replace(/Đ/g, 'D')
    .replace(/á|à|ả|ã|ạ|ă|ắ|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
    .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
    .replace(/đ/g, 'd');
};

const joinWord = s => {
  return clearUnicodeCharacters(s)
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-{2,}/g, '-');
}

module.exports = {
  clearUnicodeCharacters,
  joinWord,
};

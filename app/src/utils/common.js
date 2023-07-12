export const dateFormatter = (date, locale, options) => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}
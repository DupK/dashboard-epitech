/**
 * Created by desver_f on 06/02/17.
 */

import _ from 'lodash';

export default function parseNews(news) {
    return _.map(news, (news) => {
        const title = parseTitle(news.title);
        const details = parseDetails(news.content);

        return {
            title: title.title,
            link: title.link,
            details,
            date: news.date,
            user: news.user,
        };
    });
}

function parseTitle(str) {
    const decodedStr = decodeURI(str);
    const link = _.filter(decodedStr.match(/href="(.*?)"/), (m) => !_.startsWith(m, 'href'))[0];
    const strWithoutLink = _.trim(decodedStr
        .replace(/href="(.*?)"/, '')
        .replace(/<[\/]{0,1}(a|A)[^><]*>/g, '')
        .replace(/\s+/g, ' '));


    return {
        title: strWithoutLink,
        link,
    }
}

function parseDetails(str) {
    return _.trim(str
        .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '')
        .replace(/\s+/g, ' '));
}
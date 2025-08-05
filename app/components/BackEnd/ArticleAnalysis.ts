// {
//   "id": "11168731940454400",
//     "createTime": "2025-05-26 11:15:25",
//     "updateTime": "2025-05-26 11:17:46",
//     "title": "当夏创始人张豪：我为什么做茶？",
//     "subTitle": "95后青年创业者、福布斯U30、当夏科技创始人张豪携团队以镜头定格茶农坚守，以文字传递茶韵醇厚，用传播之力为深山好茶劈开一方天地。",
//     "imgUrl": "https://qiniu.gdkj999.com/1748229265784/微信图片_20250526111350.png",
//     "content":"",
//     "sendDate": "2025-05-26 11:15:10",
//     "status": 1
// },
export interface Article{
    id:string;
    createTime:string;
    updateTime:string;
    "title":string;
    "subTitle":string;
    imgUrl:string;
    content:string;
    sendDate:string;
    status:boolean;
}
export const ArticleAnalysis = async (currentPage:number) => {
    const response=await fetch(`https://admin.whdxcy.com/dx/notice/web/page?current=${currentPage}`, {
        method: 'GET',
    })
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();

    const articles:Article[]=data.data.records
    return {articles:articles,totalPages:data.data.pages};
}


export const fetchSub = async (n:number) => {
    const response=await fetch(`https://admin.whdxcy.com/dx/notice/web/page?current=1`, {
        method: 'GET',
    })
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();

    const articles:Article[]=data.data.records
    return articles.slice(0,n);
}

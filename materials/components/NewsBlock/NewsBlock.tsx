import * as React from 'react';
import './NewsBlock.css';

export default function NewsBlock(){
    return(
        <div className="NewsBlock">
            <h1>我是新闻标题</h1>
            <section>我是新闻内容</section>
        </div>
    );
}
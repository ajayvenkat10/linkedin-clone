import { FiberManualRecordRounded, Info } from '@material-ui/icons';
import React from 'react';
import './Widgets.css';

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordRounded/>
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );


    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <Info />
            </div>

            {newsArticle('PAPA React is back', 'TOP NEWS - 9999 readers')}
            {newsArticle('Coronavirus: India Updates', 'TOP NEWS - 8357 readers')}
            {newsArticle('Tesla hits new high!', 'Car & Auto - 999 readers')}
            {newsArticle('Royals defeat Riders in an edge of the seats thriller', 'Cricket News - 5354 readers')}
            {newsArticle('The best way to get a development job', 'Jobs - 8999 readers')}
            {newsArticle('Bitcoin breaks $22k', 'Crypto - 7237 readers')}
            {newsArticle('Is flutter the better cross platform to react ?', 'Code - 2697 readers')}

        </div>
    );
}

export default Widgets
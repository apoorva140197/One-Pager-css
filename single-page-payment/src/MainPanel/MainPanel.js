import React from 'react';
import classes from './MainPanel.module.css';
import maxresdefault from "../images/maxresdefault.svg";
import tag from "../images/tag.svg";
import headMobile from "../images/headMobile.svg";
import course from "../images/play.svg";
import test from "../images/test.svg";
import file from "../images/file.svg";
import play from "../images/play.svg";
import copy from "../images/copy.svg";
import Accordian from "../Accordian/Accordian";
export default function MainPanel(){

    let description="Securing a Bank Job and getting placed in the Banking sector has been one of the most sought after career streams for more than a decade now. Lakhs of aspirants appear for Bank Exams like IBPS PO, IBPS Clerk, IBPS RRB, SBI PO, RBI Grade etc. to get placed in one of the reputed banks of the country every year.These bank exams are conducted at national level throughout the year. Candidates who aspire for a banking career must be aware about all the Banking exams and start preparing. Here’s the exhaustive list of all the upcoming bank exams 2019Securing a Bank Job and getting placed in the Banking sector has been one of the most sought after career streams for more than a decade now. Lakhs of aspirants appear for Bank Exams like IBPS PO, IBPS Clerk, IBPS RRB, SBI PO, RBI Grade etc. to get placed in one of the reputed banks of the country every year.These bank exams are conducted at national level throughout the year. Candidates who aspire for a banking career must be aware about all the Banking exams and start preparing. Here’s the exhaustive list of all the upcoming bank exams 2019"
    return(
    <div className={classes.MainPanel}>
        <div className={classes.Header}>
            <div className={classes.HeaderLeft}>
                <div className={classes.ImageDesktop}>
                        <img src={maxresdefault} />
                    </div>
                    <div className={classes.ImageMobile}>
                        <img src={headMobile} style={{width:"100%"}}/>
                    </div>
            </div>
            <div className={classes.HeaderRight}>
               <p className={classes.Heading}>How to Prepare for Bank Pro in 2019</p>
               <div className={classes.Content}>
                    <img src={tag}/>
                    <p className={classes.tagName}>Banking ,Quantz</p>
                    
                </div>
                <p className={classes.cost}>&#x20b9; 2,999/-</p>
            </div>

        </div>

        <div className={classes.Description}>
            <p className={classes.DescriptionHead}>Description</p>
            <p className={classes.DescriptionParagraph}>
                <Accordian
                description={description}/>
            </p>
        </div>
        <div className={classes.Summary}>
            <p className={classes.SummaryHead}>Content Summary</p>
                <div className={classes.SummaryContent}>
                    <div className={classes.SummaryContentDivision}>
                            <img src={play}/>
                            <div className={classes.SummaryText}>
                                <p className={classes.SummaryList}>
                                100
                                </p>
                                <p className={classes.SummaryList}>
                                Video
                                </p>
                            </div>
                    </div>
                
               
                    <div className={classes.SummaryContentDivision}>
                            <img src={file}/>
                            <div className={classes.SummaryText}>
                                <p className={classes.SummaryList}>
                                40
                                </p>
                                <p className={classes.SummaryList}>
                                Files
                                </p>
                            </div>
                    </div>
           

                    <div className={classes.SummaryContentDivision}>
                            <img src={test}/>
                            <div className={classes.SummaryText}>
                                <p className={classes.SummaryList}>
                                20
                                </p>
                                <p className={classes.SummaryList}>
                                Tests
                                </p>
                            </div>
                    </div>
           
                   <div className={classes.SummaryContentDivision}>
                            <img src={copy}/>
                            <div className={classes.SummaryTextDuration}>
                                <p className={classes.SummaryListDuration}>
                                1 Year
                                </p>
                                <p className={classes.SummaryListDuration}>
                                Course Duration
                                </p>
                            </div>
                    </div>
           
           </div>
        </div>
        <div className={classes.PriceDetails}> 
            <p className={classes.PriceDetailsHead}>Price Details</p>
            <div className={classes.PriceList}>
                <p className={classes.PriceListText}>
                    Course Price
                </p>
                <p className={classes.PriceListText}>
                    &#x20b9; 3,900/-
                </p>

            </div>
             <div className={classes.PriceList}>
                <p className={classes.PriceListText}>
                    Internet Handling Charges
                </p>
                <p className={classes.PriceListText}>
                    &#x20b9; 10/-
                </p>

            </div>

        </div>

         <div className={classes.Amount} >
                <p className={classes.AmountText} >
                    Amount Payable
                </p>
                <p style={{marginBottom:"0"}} >
                    &#x20b9; 3,900/-
                </p>

            </div>
    </div>
    )

}
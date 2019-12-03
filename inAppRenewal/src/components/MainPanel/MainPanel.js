import React, { useState, useEffect, Fragment } from 'react';
import CarouselDesktop from '../Carousel/CarouselDesktop';
import CarouselMobile from '../Carousel/CarouselMobile';
import classes from './MainPanel.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import info from '../../assets/images/info.svg';
export default function MainPanel(props) {
	const { 
		isAndroid, 
		isVideo,
		isAdv,
		isTest,
		setIsAndroid,
		setIsVideo,
		setIsAdv,
		setIsTest 
	} = props;

	return (
		<React.Fragment>
			<div className={classes.MainContainer}>
				{/* {props.random % 2 == 0 && (
					<Fragment>
						<div className={classes.CarouselDesktop}>
							<CarouselDesktop />
						</div>
						<div className={classes.CarouselMobile}>
							<CarouselMobile />
						</div>
					</Fragment>
				)} */}
				<Fragment>
						<div className={classes.CarouselDesktop}>
							<CarouselDesktop />
						</div>
						<div className={classes.CarouselMobile}>
							<CarouselMobile />
						</div>
					</Fragment>
				<div className={classes.MonthPlan}>
					<span className={classes.Heading}>Select a plan</span>
					<div className={classes.CardContainer}>
						{props.plans.map((plan) => {
							return (
								<button
									key={plan.time}
									className={props.time == plan.time ? classes.CardParentFocus : classes.CardParent}
									onClick={() => props.setTime(plan.time)}
								>
									{plan.time == 12 && !isAdv && isTest && isVideo ? (
										<div className={classes.CardTag}>
											<span className={classes.TagText}>Recommended</span>
										</div>
									) : (
										''
									)}

									<div
										className={
											props.time == plan.time ? (
												classes.CardParentMonthFocus
											) : (
												classes.CardParentMonth
											)
										}
									>
										<span className={classes.MonthNumber}>{plan.time}</span>
										<span className={classes.MonthText}>months</span>
									</div>
									<div className={classes.CardParentCost}>
										<span className={classes.CardCost}>
											&#x20b9;
											{Math.floor(plan.amount / plan.time)}
											<span className={classes.ShowDecimal}>
												{(plan.amount / plan.time - Math.floor(plan.amount / plan.time))
													.toFixed(2)
													.slice(1, 4)}
											</span>/mo
										</span>
										<div className={classes.BuildMonth}>
											{plan.time == 12 ? (
												'Build annually'
											) : plan.time == 6 || plan.time == 3 ? (
												`Build every ${plan.time} months`
											) : (
												'Build every month'
											)}{' '}
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
				<div className={classes.CustomizedPlan}>
					<span className={classes.Heading}>Customize your plan</span>
					<span className={classes.HeadingText}>
						Your plan includes your institute's own whitelabeled android app
					</span>
					<span className={classes.CustomizedPlanText}>Select add-ons : </span>
					<div className={classes.CheckboxButtonContainer}>
						
						<label className={isTest ? classes.CheckBoxLabelFocus : classes.CheckBoxLabel}>
							<input
								type="checkbox"
								value="Test"
								className={classes.Checkbox}
								checked={isTest}
								onClick={() => setIsTest(Number(!isTest))}
							/>
							<span className={isTest ? classes.CheckFocus : classes.Check}> Online Test Portal</span>
						</label>

						<label className={isVideo ? classes.CheckBoxLabelFocus : classes.CheckBoxLabel}>
							<input
								type="checkbox"
								value="Video"
								className={classes.Checkbox}
								checked={isVideo}
								onClick={() => setIsVideo(Number(!isVideo))}
							/>
							<span className={isVideo ? classes.CheckFocus : classes.Check}>Video Portal </span>
						</label>
					</div>

					<span className={classes.CustomizedPlanText}>
						<span>Show advertisements in my app?</span>
						<span
							data-tooltip="If you select yes, then your app will contain advertisements from Google Play Store. It is recommended to select a plan without advertisements."
							data-tooltip-position="bottom"
						>
							{' '}
							<img src={info} alt="" style={{ margin: '0 20px', cursor: 'pointer' }} />
						</span>
					</span>
					<div className={classes.AddButtonContainer}>
						<button
							className={!isAdv ? classes.AddButtonFocus : classes.AddButton}
							onClick={() => setIsAdv(0)}
						>
							{' '}
							No{' '}
						</button>
						<button
							className={isAdv ? classes.AddButtonFocus : classes.AddButton}
							onClick={() => setIsAdv(1)}
						>
							{' '}
							Yes{' '}
						</button>
					</div>
				</div>
			</div>
			<div className={classes.TnC}>
				<span className={classes.Heading}>Terms and Conditions</span>
				<span className={classes.TnCText}>
					{' '}
					A promo code is valid for one time usage per user. Company reserves the right to withdraw any of the
					promotional activities/coupons without prior notice.
					<br />
					<br />The amount for renewal or re-subscription of the application might be different from your
					current plan.
				</span>
			</div>
		</React.Fragment>
	);
}

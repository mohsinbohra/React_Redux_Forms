import React, { Component } from 'react';



import Dishdetail from '../DishdetailComponent';
import Menu from '../MenuComponent';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import Home from '../HomeComponent';
import Contact from '../ContactComponent';
import About from '../AboutComponent';
import {connect} from 'react-redux';
import { addComment,fetchDishes } from '../../Redux/ActionCreators';
import DishDetail from '../DishdetailComponent';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addComment: (dishId, rating, author, comment) => {
//       dispatch(addComment(dishId, rating, author, comment))
//       fetchDishes: () => { dispatch(fetchDishes())}
//     }
//   }
// }


const mapDispatchToProps = (dispatch) => ({
 addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  
});



class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
  }
    
   
 
    render() {

      const HomePage = () => {
        return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        );
      }
    
      const DishWithId= ({match}) =>{
       return( <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
       isLoading={this.props.dishes.isLoading}
       errMess={this.props.dishes.errMess}
       comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
       addComment={this.props.addComment}
     />)
      }

      return (
        <div>
         <HeaderComponent />

         <Switch>
         <Route path='/home' component={HomePage} /> 
         <Route path='#' component={About} />         
         <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
         <Route path='/menu/:dishId' component={DishWithId} />
         <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
         <Redirect to="/home" />
     </Switch>

        
          
          <FooterComponent />
        </div>
      );
    }
  }
  
  // <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
  // <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />

  export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Main));
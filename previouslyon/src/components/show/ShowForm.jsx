import React, {Component} from 'react';
import { Form } from 'react-bootstrap';


class ShowForm extends Component{
    
    state = {
        saison: ''
    }
    
    onSelectChange = e => {        
        let season = e.target.value; 
        this.setState({  season: season});      
        this.props.fetchShowEpisodes(season);
    }

    renderSelectInput = seasons => {
        return(
            <div className="">
                <Form>
                    <Form.Group >
                        <span className="badge badge-danger mb-2" style={{fontSize:'25px'}}>SEASONS
                            {this.state.season === undefined 
                                ? <span className="ml-2" style={{fontSize:'25px'}}>1</span> 
                                : <span className="ml-2" style={{fontSize:'25px'}}>{this.state.season}</span>
                            }                           
                            
                        </span>
                        <Form.Control 
                            as="select" 
                            onChange={this.onSelectChange}                                                                           
                            >
                            {seasons.map( season => {
                                return(
                                    <option 
                                        key={season.number}                                                                              
                                        value={season.number}>Season {season.number}
                                    </option>                                                
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    render(){
        return ( 
            <>
                {this.renderSelectInput(this.props.state.seasons)}
            </>
        );
    }  
}
export default ShowForm;
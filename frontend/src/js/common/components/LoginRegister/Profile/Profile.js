import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField, renderFilePicker} from '../../Utils/renderField/renderField';
import ProfileForm from "./ProfileForm";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {avatar: null};
    }

    setAvatar = (avatar) => {
        this.setState({avatar});
    };

    update = (data) => {
        const { update } = this.props;
        update({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    };

    render() {
        const { me } = this.props;

        return (
            <ProfileForm onSubmit={this.update} me={me} setAvatar={this.setAvatar} />
        );
    }
}

export default reduxForm({
    form: 'profile', // a unique identifier for this form
})(Profile);

import React, { Component } from 'react';
import axios from 'axios';

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumId: '',
            photos: [''],
            loading: false,
        };
    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validate = () => {
        let isError = false;
        const errors = {
            albumIdError: '',
            albumIdStatus: false,
        };

        if (this.state.albumId === '') {
            isError = true;
            errors.albumIdStatus = true;
            errors.albumIdError = 'Please provide album id';
        }

        this.setState({
            ...this.state,
            ...errors,
        });
        return isError;
    };

    handleSubmit(e) {
        e.preventDefault();
        const error = this.validate();
        if (!error) {
            this.setState({ loading: true });
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/albums/${this.state.albumId}/photos`
                )
                .then((response) => response)
                .then((json) => {
                    if (json.data) {
                        this.setState({ loading: false });
                        this.setState({ albumId: '' })
                        const photos = json.data;
                        this.setState({ photos });
                    }
                });
        }
    }

    render() {
        return (
            <div className='album'>
                <div className='form-section'>
                    <h2>Enter Album ID</h2>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='album-input-id'>
                            <input
                                type='number'
                                name='albumId'
                                value={this.state.albumId}
                                onChange={(e) => this.change(e)}
                            />
                            <div className='input-error'>{this.state.albumIdError}</div>
                        </div>
                        <div className='album-btn'>
                            <button>Get Album Photos By Id</button>
                        </div>
                    </form>
                </div>

                <div className='album-photo'>
                    {this.state.loading ? (
                        <div class='loading-spinner'>
                            <div class='loader'></div>
                        </div>
                    ) : this.state.photos.length > 0 ? (
                        this.state.photos.map((photo, i) => (
                            <div className='photo' key={i}>
                                {photo.thumbnailUrl ? (
                                    <div>
                                        <div className="photo-img">
                                            <img src={photo.thumbnailUrl} alt='' />
                                        </div>
                                        <h4>{photo.title}</h4>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ))
                    ) : (
                        <div className='error-result'>Album was not found!</div>
                    )}
                </div>
            </div>
        );
    }
}

export default Album;

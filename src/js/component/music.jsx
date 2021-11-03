import React from "react";
import PropTypes from "prop-types";

const Music = props => {
	return (
		<li
			onClick={() => {
				props.selectsong(props.song);
			}}>
			{props.song.name}
		</li>
	);
};

Music.propTypes = {
	song: PropTypes.object,
	selectsong: PropTypes.func
};

export default Music;

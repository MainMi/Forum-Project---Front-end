import CommentItem from './CommentItem';
import classes from './CommentList.module.scss'

const CommentList = ({ comments = [] }) => {

    return <div className={classes.commentList}>
        {comments.map((vl) => <CommentItem comment={vl} key={vl.id}/>)}
    </div>
}

export default CommentList;
import React, {Component} from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="d-flex">
                        <div className="font-weight-bold pr-2">
                            <img src="../img/news.png" width="20px" alt="" />
                            &nbsp;News:
                        </div>
                        <div className="flex-fill pr-1 pl-1 news-title">
                            <p className="text-nowrap">
                                বিএসএমএমইউয়ে করোনা পরীক্ষার ফল মাত্র ৪ ঘণ্টায়
                                বিএসএমএমইউয়ে করোনা পরীক্ষার ফল মাত্র ৪ ঘণ্টায়
                                কাঁঠালিয়ায় জ্বর ও ডায়রিয়ায় শিশুর মৃত্যু, ৬ পরিবার কোয়ারেন্টিনে
                                কাঁঠালিয়ায় জ্বর ও ডায়রিয়ায় শিশুর মৃত্যু, ৬ পরিবার কোয়ারেন্টিনে
                                ৩০০ অসহায় মানুষকে খাওয়াবেন জেমি ডে
                                ৩০০ অসহায় মানুষকে খাওয়াবেন জেমি ডে
                                করোনার আতঙ্ক থেকে বাঁচব কীভাবে?
                                করোনার আতঙ্ক থেকে বাঁচব কীভাবে?
                                করোনা–আক্রান্তদের জন্য কয়েকটি টিপস
                                করোনা–আক্রান্তদের জন্য কয়েকটি টিপস
                            </p>
                        </div>
                        <div className="ml-auto pl-2">
                            BOX IT
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default connect(state => state)(Home);
export default Footer;
import {defineComponent} from "vue";
import type {CSSProperties} from 'vue'

export default defineComponent<{ msg: string }>((props, ctx) => {
    const className: CSSProperties = {
        position: 'fixed',
        inset: '0px',
        margin: 'auto',
        width: '100px',
        background: '#f1f3f4',
        textAlign: 'center',
        lineHeight: '32px',
        height: '32px',
        zIndex: '9999'
    }
    return () => (<div style={className}>{props.msg}</div>)
}, {
    props: {
        msg: {
            type: String
        }
    }
})
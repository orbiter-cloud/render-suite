import {RenderClient} from '@orbito/render-client/RenderClient'
import util from 'node:util'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const renderClient = new RenderClient(
        {
            default: 'http://localhost:3000',
        }, {
            html: RenderClient.optimizeForHtml,
            email: RenderClient.optimizeForEmail,
        },
    )

    const tplId = 'my-tpl'
    const styleId = 'main'

    const stat = util.promisify(fs.stat)
    const mkdir = util.promisify(fs.mkdir)
    try {
        await stat(path.join(__dirname, 'build'))
    } catch(e) {
        await mkdir(path.join(__dirname, 'build'))
    }

    const res = await renderClient.render(
        'default', 'en', styleId,
        renderClient.tplRef(tplId, 'pages/default'),// the template reference
        renderClient.optimize('html'),// the optimization settings
        {
            info: {
                title: 'Static Page Title',
            },
        },// data, available in template under `doc.*`
        {
            'bg-body': '#75b6b3',
        },// styleVars, configure Scss vars just in time
    )
    console.log('   > rendered template in ' + res.renderTime + 'ms')
    const html = res.rendered
    fs.writeFileSync(path.join(__dirname, 'build', 'index.html'), html)
    console.log('   > written output to: ' + 'index.html')

    const resStyle = await renderClient.style(
        'default', styleId, tplId,
        {nanoCss: true, cssAutoPrefix: true},
        {},// styleVars, configure Scss vars just in time
    )
    console.log('   > generated style in ' + resStyle.styleTime + 'ms')
    const style = resStyle.style
    fs.writeFileSync(path.join(__dirname, 'build', styleId + '.css'), style)
    console.log('   > written output to: ' + styleId + '.css')
})()
    .then(() => {

    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

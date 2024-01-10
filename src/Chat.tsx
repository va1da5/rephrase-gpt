import { ScrollArea } from "./components/ui/scroll-area";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { useSettingsContext } from "./context";
import { useRef, useState } from "react";

function Placeholder() {
  return (
    <div className="text-lg">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quasi nihil
      enim est repudiandae sunt, commodi perferendis incidunt! Quas ex doloribus
      earum recusandae minima at omnis pariatur itaque laudantium perspiciatis!
      Sapiente minus ullam iste accusantium amet hic debitis, voluptatibus nihil
      ex molestiae voluptates illum quibusdam, cupiditate repudiandae laborum
      natus at, et ducimus quos eum illo tempora expedita? Sequi, unde vero.
      Perferendis beatae, optio cupiditate ipsam blanditiis sunt architecto
      libero, itaque maxime perspiciatis eaque nostrum modi ipsa odit,
      accusantium voluptatum sint reprehenderit. Iure placeat inventore
      cupiditate quaerat aliquam architecto similique id? Ex officiis voluptates
      soluta dolores quisquam non ipsum! Provident, illum veniam. Nostrum fuga
      architecto totam, id eos dolore voluptates laborum tempora minima atque
      corrupti aliquam doloribus delectus praesentium aut quis! Quisquam minus
      perspiciatis earum consequuntur deserunt, voluptatum et at corporis, qui
      molestiae modi unde fuga veritatis ab ea maiores molestias delectus ut
      praesentium culpa voluptatibus? Rerum ut numquam expedita. Reiciendis.
      Quaerat perspiciatis corrupti, magni et a ipsam temporibus dolorum maxime
      nostrum in quos ut aliquam aspernatur veritatis illum, illo officia
      dolores ratione, reiciendis est voluptates iste asperiores magnam. Quo,
      vero. Rerum aliquam consequuntur architecto sequi illo mollitia, minus
      consequatur tempora non odit magnam explicabo ipsa harum, quia facilis est
      culpa incidunt fugit distinctio nobis facere! Accusamus saepe eveniet
      facilis at. Obcaecati, amet a dolor suscipit ex autem natus placeat iure
      accusamus officiis libero magnam odio voluptatum itaque eum doloremque
      dolores repellendus temporibus alias, numquam debitis! Veritatis mollitia
      maxime distinctio accusamus. Incidunt aliquid nesciunt assumenda vitae qui
      libero delectus unde, praesentium, dolor debitis accusamus ad iure officia
      voluptatem nostrum fugiat illum voluptate! Blanditiis non nemo dicta ipsum
      eaque velit expedita cum! Cumque repudiandae aperiam earum officia
      laboriosam nobis iure aspernatur porro id consequatur animi voluptatum
      aliquam magni neque minima, ex quod expedita corporis. Optio id qui culpa
      rem itaque omnis repellendus. Esse magni alias saepe a modi vitae
      doloremque. Sint, rem in repellat dicta totam veniam, dolorum officiis
      quisquam id laudantium, sapiente exercitationem. Consequatur vel accusamus
      modi, maxime quidem nisi quas! Consequuntur at perspiciatis deleniti optio
      neque voluptates incidunt corrupti nostrum tempora accusamus. Beatae
      molestiae inventore, consequuntur quos illum dolorum non tempora deserunt
      ea distinctio quam vitae corporis, consequatur fuga eos? Ab, culpa ipsam
      nulla minima aspernatur, ipsum suscipit provident amet doloribus unde
      vitae, reiciendis adipisci possimus. Autem quaerat est ipsam, voluptate
      eveniet corrupti, accusantium a accusamus ratione odit, illum architecto?
      Sunt repellendus praesentium temporibus architecto magni nisi optio dicta
      harum possimus. Porro enim ab sint veritatis officia, magni modi iure, et
      sapiente laborum tempore eum aliquam tempora odit suscipit animi. Officia
      ad, dolores nisi saepe asperiores eos id repudiandae voluptatum modi eius
      odio est laborum expedita culpa commodi consectetur itaque voluptas quasi
      architecto, eum assumenda! Nobis eaque dicta quaerat suscipit. Perferendis
      magni, dolor recusandae sed laudantium cumque voluptatum? Eaque aut culpa
      vero autem accusantium sit commodi fugit recusandae nobis minima, debitis
      qui earum voluptates corrupti libero consequatur! Rem, odio aut. A animi
      numquam blanditiis praesentium, id quis illo temporibus veniam sint alias
      obcaecati incidunt ex nemo possimus suscipit nisi officia commodi
      doloremque fugiat labore tenetur? Quia tenetur hic quisquam blanditiis. Id
      nam placeat inventore quos cumque ducimus commodi ullam minima iste
      mollitia, unde odit fugit laudantium ipsam optio voluptate deserunt in
      dignissimos earum cum dolorem distinctio rem ratione! Quasi, delectus.
      Voluptate sint mollitia eum dolor quam corrupti doloremque, necessitatibus
      nobis sed omnis! Id pariatur velit recusandae officia, provident ratione,
      maxime facere quasi quidem dignissimos placeat aliquid maiores corporis
      iure cupiditate. Consequatur tempore placeat et minus nihil necessitatibus
      natus similique quidem, eaque eos velit tenetur quia id quis quaerat
      voluptatibus delectus eveniet recusandae! Et veniam voluptatibus ducimus
      hic expedita nesciunt error? Recusandae, doloribus aliquid odio dolorem
      nam quisquam! Libero, nemo temporibus! Eaque, in maxime. Similique,
      assumenda? Consectetur iusto reprehenderit officiis aliquam laboriosam
      maiores error et vero dignissimos, blanditiis, quod deserunt! Minus?
      Cupiditate ducimus dolores fuga iusto ea minus facilis est exercitationem,
      illum aperiam necessitatibus amet veniam consequuntur eligendi totam
      aspernatur rem error alias, quia architecto corrupti labore modi omnis
      earum. Esse. Sunt quis ut, cupiditate adipisci nulla nobis ea porro
      voluptas reprehenderit perspiciatis pariatur voluptate consectetur, natus
      iure placeat vitae error fugit ipsum incidunt nostrum explicabo
      repellendus, facilis ipsam? Voluptas, non. Quo adipisci explicabo autem
      impedit deserunt deleniti omnis, iste esse placeat excepturi possimus
      voluptates modi ab quibusdam error hic alias quod blanditiis maxime
      distinctio incidunt quisquam! Ea expedita modi cumque. Quos, magnam
      aliquam autem id rem consectetur pariatur aperiam doloribus veniam ipsa
      natus rerum aut quo, distinctio error magni sit deserunt voluptas maiores!
      Perspiciatis quod tenetur eos velit repudiandae a? Consectetur recusandae
      quas corporis tempora accusantium officia repellendus illo, cum dolorum
      mollitia esse officiis, at sunt aliquam aperiam beatae! Autem quisquam ad
      suscipit officia molestias sunt obcaecati et quod aperiam. Explicabo,
      natus. Eos expedita ipsa sit quaerat modi cum, culpa odio voluptatem
      impedit necessitatibus suscipit, numquam quasi illo explicabo? Error
      mollitia pariatur quos hic, officia quas quasi voluptatum exercitationem
      dolorem! Natus vero delectus ratione molestias, voluptate veniam
      blanditiis asperiores enim! Nostrum, voluptatem! Distinctio, vel quo nemo
      eaque quaerat pariatur ratione odio. Inventore sunt neque pariatur
      excepturi officia ab laborum iste? Quis totam numquam fugiat ut illum
      excepturi explicabo. Placeat, eveniet recusandae? Molestiae illo, nesciunt
      velit animi autem corporis ad doloribus laborum officiis eius alias,
      suscipit maxime quisquam placeat? Expedita, iure. Quia perspiciatis
      molestias distinctio explicabo quod, id itaque placeat nesciunt non
      eligendi illo dolorem nulla animi. Quo aliquid fugit sunt ullam ab. Itaque
      aperiam deleniti tempora ipsa molestias velit et! Debitis dolore odio nam
      dignissimos. Reprehenderit magnam fugiat officiis, nihil fuga nemo ut, at,
      facilis esse magni quo. Minus accusantium itaque adipisci saepe obcaecati
      id omnis beatae harum facere excepturi. Minus voluptatum provident
      delectus alias modi nihil at, aspernatur sit aliquid vero nostrum,
      quisquam doloribus quas rerum mollitia sint unde laboriosam reiciendis,
      odit nisi iusto ipsam blanditiis officiis. Quas, fuga. Maiores blanditiis
      laboriosam unde voluptas aperiam doloribus, voluptatibus rem asperiores
      enim magni dolore autem nulla et quasi modi ullam repellendus reiciendis.
      Itaque accusamus autem amet perspiciatis neque iusto laudantium ullam.
      Tempore facere itaque unde error quam, nostrum iste voluptatem placeat.
      Exercitationem nostrum deleniti sint mollitia, nihil quaerat vero
      accusantium ut totam incidunt ipsa culpa qui a similique esse modi dolor!
      Cumque ipsa soluta quibusdam consequuntur iusto veniam! Vitae perferendis
      unde voluptas culpa quisquam quod totam nam reprehenderit repudiandae,
      quos officia error provident soluta aliquam impedit? Assumenda harum
      cupiditate atque deserunt? Facere aut veritatis recusandae repellendus qui
      inventore suscipit eveniet exercitationem. Nesciunt qui accusamus sequi
      minus numquam id aut adipisci minima similique atque itaque placeat
      praesentium, eveniet aspernatur eius tempora error. Doloribus pariatur,
      facilis nam facere perspiciatis dolorem ad omnis iusto ipsum quisquam fuga
      vel tempora voluptates officiis unde quidem molestiae consequatur.
      Consequatur recusandae ad eaque nobis eos pariatur quia voluptatum. Ab
      soluta eum hic ad adipisci doloremque quas expedita corrupti, cumque nulla
      corporis eligendi accusantium voluptatem consectetur libero atque
      repellendus repellat. Esse porro assumenda beatae necessitatibus corporis
      alias nostrum velit. Deleniti mollitia culpa quaerat laboriosam delectus
      quod eveniet doloribus, reprehenderit distinctio corporis nostrum
      obcaecati natus. Asperiores non repudiandae incidunt, debitis nostrum
      distinctio delectus optio fuga iste error aliquam dignissimos blanditiis?
      Obcaecati iusto, iure, hic magni eligendi illo nostrum ut eos deleniti
      nihil facere, accusantium soluta voluptas cum voluptatum? Vero recusandae
      vitae, reiciendis cumque alias corporis quos ab similique unde veniam.
      Itaque aspernatur exercitationem quia numquam distinctio in, pariatur
      minus consectetur deleniti quaerat ducimus obcaecati quasi! Deleniti
      similique aperiam sapiente libero voluptatum nam, corrupti deserunt,
      numquam omnis quos, perspiciatis nihil ullam. Illo enim, aut laborum vitae
      explicabo voluptates id corrupti nisi ea quasi. Consectetur ullam non
      assumenda dolore similique vero mollitia, adipisci nulla accusamus?
      Accusamus voluptate animi sit sint exercitationem molestias. Cum nostrum
      saepe harum, ex, porro molestiae totam nisi enim obcaecati suscipit error,
      et doloribus nemo vel nobis amet voluptate deserunt veniam unde officia.
      Nihil repudiandae eligendi ea pariatur omnis. Non, pariatur? Tempore,
      reprehenderit. Quisquam sequi minus obcaecati autem officia dicta fugit
      officiis possimus commodi, corrupti dolore, minima quibusdam accusantium
      modi, repudiandae ea recusandae iste ab inventore nihil aliquam
      asperiores? Pariatur sed at animi iusto quod fugiat similique repellendus,
      aut nisi fuga voluptate nam cumque rerum ipsum est sapiente harum maiores
      numquam consequuntur. Non reprehenderit voluptates, aperiam maiores harum
      commodi? Amet maxime consectetur magnam fugit dignissimos praesentium,
      aliquam accusantium sit consequuntur mollitia odit labore, nihil vel autem
      laudantium sunt exercitationem perferendis quod commodi harum sequi!
      Voluptate quidem dolor suscipit rerum! Sed adipisci fuga nisi quasi
      necessitatibus voluptates dolore vitae odio quo? Nam deserunt dolorem
      dolorum repellat quaerat est odio sit eligendi numquam. Voluptate dolore
      enim nihil quis molestias ea quidem. Cumque, quis? Doloremque, esse ullam
      quisquam adipisci optio rerum quidem et eaque a quam cumque. Dolorem
      veniam tempora repellendus, aliquid commodi, error perspiciatis voluptatum
      fugiat corrupti animi repudiandae ipsum fugit? Rem temporibus consequatur
      cupiditate reprehenderit. Ipsa magni voluptatem placeat exercitationem
      atque, maiores culpa rem deleniti eaque quaerat et incidunt eos harum,
      doloribus labore! Architecto at illum repellat reiciendis, cumque animi.
      Dolorem expedita modi dolore, suscipit quas saepe quaerat repellendus quis
      amet accusantium iure aliquid provident quia vel facilis? Quo amet maxime
      cum distinctio veniam ad eos voluptates officia voluptatum quia.
    </div>
  );
}

export default function Chat() {
  const { settings, dispatch } = useSettingsContext();
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  function getPromptValue(): string {
    if (formRef.current)
      return (formRef.current.elements.namedItem("prompt") as HTMLInputElement)
        ?.value;

    return "";
  }

  return (
    <div className=" col-span-8 grid h-dvh grid-cols-1 grid-rows-[minmax(0,_1fr)_auto]">
      <ScrollArea className="h-full overflow-y-auto p-10">
        <Placeholder />
      </ScrollArea>

      <div>
        <form
          ref={formRef}
          className="flex items-end gap-3 p-10"
          onSubmit={(event) => {
            event.preventDefault();

            setInput(getPromptValue());
          }}
        >
          <Textarea
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Your query goes here..."
            name="prompt"
            onKeyDownCapture={(event) => {
              if (event.code != "Enter" || event.shiftKey) return;

              const prompt = getPromptValue();

              if (prompt.length && prompt.split("\n").length < 2) {
                event.preventDefault();
                return setInput(prompt);
              }
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
